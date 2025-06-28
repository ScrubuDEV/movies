import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MovieDetail } from '../../../core/models/movie-details.model';
import { MovieService } from '../../../core/services/movie.service';
import { GuestSession } from '../../../core/models/user.model';
import { StarFill, StarFillObject } from '../../../config/movies.constants';
import { TMDB_LOCAL_STORAGE } from '../../../config/tmdb.constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: false,
})
export class MovieDetailComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;

  movie = signal<MovieDetail | null>(null);
  rating = signal<number>(0);
  displayRating = signal<number>(0);
  feedback = signal<string>('');
  isOpen = signal(false);
  public StarFill = StarFillObject;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params) => this.movieService.getMovieDetails(+params.get('id')!)))
      .subscribe((detail) => this.movie.set(detail));
  }

  setRating(value: number): void {
    this.rating.set(value);
  }

  setDisplayRating(value: number): void {
    this.displayRating.set(value);
  }

  resetDisplayRating(): void {
    this.displayRating.set(this.rating());
  }

  submitRating(): void {
    const m = this.movie();
    const session = localStorage.getItem(TMDB_LOCAL_STORAGE);

    if (!m || !session) {
      return this.feedback.set('Missing data.');
    }

    this.movieService.rateMovie(m.id, this.rating(), session).subscribe({
      next: () => this.feedback.set('Rating submitted!'),
      error: () => this.feedback.set('Failed to submit.'),
    });
  }

  close(): void {
    this.location.back();
  }

  open(): void {
    this.isOpen.set(true);
  }

  getSpokenLanguages(): string {
    const langs = this.movie()?.spoken_languages ?? [];
    return langs.map((lang) => lang.english_name || lang.name).join(', ') || 'N/A';
  }

  isWholeNumberRating(): boolean {
    const currentRating = this.displayRating() || this.rating();
    return currentRating % 1 === 0;
  }

  getStarFill(starIndex: number): StarFill {
    const value = this.displayRating() ?? this.rating() ?? 0;
    const starValue = starIndex + 1; 

    if (value >= starIndex * 2 + 2) return StarFill.Full;
    if (value >= starIndex * 2 + 1) return StarFill.Half;
    return StarFill.Empty;
  }
}
