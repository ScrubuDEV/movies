import { Component, OnInit, ViewChild, signal, computed, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MovieService } from '../../../core/services/movie.service';
import { PagedResponse } from '../../../core/models/paging.model';
import { forkJoin } from 'rxjs';
import { Movie } from '../../../core/models/movie.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalCollection } from '../../../core/models/collection.model';
import { CollectionsService } from '../../../core/services/collections.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  standalone: false,
})
export class MovieSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9 ]+$/)],
  });

  response = signal<PagedResponse>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  pageSize = signal<number>(20);
  currentPage = signal<number>(1);

  collections: LocalCollection[] = [];

  movies = computed(() => this.response().results);
  totalResults = computed(() => this.response().total_results);

  constructor(
    private movieService: MovieService,
    private collectionService: CollectionsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadCollections();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((q) => {
        if (q === '' || this.searchControl.valid) {
          this.loadPage(1, this.pageSize(), q.trim());
          this.currentPage.set(1);
        }
      });

    this.loadPage(1, this.pageSize(), '');
  }

  loadCollections() {
    this.collectionService.getCollections().subscribe((collections) => {
      this.collections = collections;
    });
  }

  loadPage(page: number, size: number, query: string) {
    const apiPageSize = 20;

    const startIndex = (page - 1) * size;
    const startApiPage = Math.floor(startIndex / apiPageSize) + 1;
    const endIndex = page * size - 1;
    const endApiPage = Math.floor(endIndex / apiPageSize) + 1;
    const pagesToFetch = Array.from(
      { length: endApiPage - startApiPage + 1 },
      (_, i) => startApiPage + i,
    );

    const requests = pagesToFetch.map((p) =>
      query ? this.movieService.searchMovies(query, p) : this.movieService.discoverMovies(p),
    );

    forkJoin(requests).subscribe((responses) => {
      const allResults = responses.flatMap((r) => r.results);
      const sliceStart = startIndex % apiPageSize;
      const pageResults = allResults.slice(sliceStart, sliceStart + size);

      this.response.set({
        page,
        results: pageResults,
        total_pages: Math.ceil(responses[0].total_results / size),
        total_results: responses[0].total_results,
      });

      this.paginator.pageIndex = page - 1;
    });
  }

  onPageChange(event: PageEvent) {
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    const q = this.searchControl.value.trim();
    if (q === '' || this.searchControl.valid) {
      this.pageSize.set(size);
      this.currentPage.set(page);
      this.loadPage(page, size, q);
    }
  }

  goToDetail(movie: Movie) {
    this.router.navigate([{ outlets: { popup: ['movie', movie.id] } }]);
  }

  onAddToCollection(movie: Movie, collectionId: string) {
    this.collectionService.addMovieToCollection(collectionId, movie).subscribe((success) => {
      if (success) {
        this.snackBar.open('Movie added to collection', 'Close', {
          duration: 2000,
        });
        this.loadCollections();
        this.cdr.markForCheck();
      } else {
        this.snackBar.open('Movie already in collection', 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
