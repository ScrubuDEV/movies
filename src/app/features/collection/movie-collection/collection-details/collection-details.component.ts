import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { LocalCollection } from "../../../../core/models/collection.model";
import { Movie } from "../../../../core/models/movie.model";
import { CollectionsService } from "../../../../core/services/collections.service";


@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss'],
  standalone: false,
})
export class CollectionDetailsComponent implements OnInit {
  collection: LocalCollection | undefined;
  movies$: Observable<Movie[]> = of([]);
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCollection(id);
      } else {
        this.router.navigate(['/collections']);
      }
    });
  }

  loadCollection(id: string): void {
    this.isLoading = true;
    this.collectionService.getCollectionById(id).subscribe({
      next: (collection) => {
        if (!collection) {
          this.handleCollectionError();
          return;
        }
        this.collection = collection;
        this.movies$ = this.collectionService.getMoviesByIds(collection.movie_ids);
        this.isLoading = false;
      },
      error: () => this.handleCollectionError(),
    });
  }

  private handleCollectionError(): void {
    this.isLoading = false;
    this.router.navigate(['/collections']);
    this.snackBar.open('Error loading collection', 'Close', { duration: 3000 });
  }

  viewMovieDetails(movieId: number): void {
    this.router.navigate([{ outlets: { popup: ['movie', movieId] } }]);
  }

  removeMovie(movieId: number): void {
    if (!this.collection?.id) return;

    this.collectionService.removeMovieFromCollection(this.collection.id, movieId).subscribe({
      next: (updatedCollection) => {
        this.collection = updatedCollection;
        this.movies$ = this.collectionService.getMoviesByIds(updatedCollection.movie_ids);
        this.snackBar.open('Movie removed', 'Close', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open(`Failed to remove movie: ${err.message}`, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/collections']);
  }
}
