import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, map, catchError, BehaviorSubject, throwError } from 'rxjs';
import { STORAGE_KEY } from '../../config/movies.constants';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../../config/tmdb.constants';
import { CollectionSearchResponse, LocalCollection } from '../models/collection.model';
import { Movie } from '../models/movie.model';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private currentCollection = new BehaviorSubject<LocalCollection | null>(null);

  constructor(
    private http: HttpClient,
    private movieService: MovieService,
  ) {}

  searchCollections(query: string, page = 1): Observable<CollectionSearchResponse> {
    const params = new HttpParams()
      .set('api_key', TMDB_API_KEY)
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<CollectionSearchResponse>(`${TMDB_BASE_URL}/search/collection`, {
      params,
    });
  }

  getCollections(withMovies: boolean = false): Observable<LocalCollection[]> {
    const collections = this.getCollectionsSync();

    if (!withMovies) {
      return of(collections);
    }

    return forkJoin(
      collections.map((collection) =>
        this.getMoviesByIds(collection.movie_ids).pipe(
          map((movies) => ({
            ...collection,
            movies,
          })),
        ),
      ),
    );
  }

  getCollectionById(id: string): Observable<LocalCollection | undefined> {
    const collections = this.getCollectionsSync();
    return of(collections.find((c) => c.id === id));
  }

  createCollection(title: string, description: string): Observable<LocalCollection> {
    const collections = this.getCollectionsSync();
    const newCollection: LocalCollection = {
      id: Date.now().toString(),
      title,
      description,
      movie_ids: [],
    };
    collections.push(newCollection);
    this.saveCollections(collections);
    return of(newCollection);
  }

  addMovieToCollection(collectionId: string, movie: Movie): Observable<boolean> {
    const collections = this.getCollectionsSync();
    const collection = collections.find((c) => c.id === collectionId);

    if (collection && !collection.movie_ids.includes(movie.id)) {
      collection.movie_ids.push(movie.id);
      this.saveCollections(collections);
      return of(true);
    }
    return of(false);
  }

  removeMovieFromCollection(collectionId: string, movieId: number): Observable<LocalCollection> {
    const collections = this.getCollectionsSync();
    const collectionIndex = collections.findIndex((c) => c.id === collectionId);

    if (collectionIndex === -1) {
      return throwError(() => new Error('Collection not found'));
    }

    const movieIds = collections[collectionIndex].movie_ids;
    const filtered = movieIds.filter((id) => id !== movieId);

    if (filtered.length === movieIds.length) {
      return throwError(() => new Error('Movie not in collection'));
    }

    collections[collectionIndex].movie_ids = filtered;
    this.saveCollections(collections);

    return of(collections[collectionIndex]);
  }

  deleteCollection(collectionId: string): Observable<LocalCollection[]> {
    const collections = this.getCollectionsSync();
    const updatedCollections = collections.filter((c) => c.id !== collectionId);
    this.saveCollections(updatedCollections);
    return of([...updatedCollections]);
  }

  getMoviesByIds(ids: number[]): Observable<Movie[]> {
    if (!ids?.length) return of([]);

    const requests = ids.map((id) =>
      this.movieService.getMovieById(id).pipe(
        catchError((err) => {
          console.warn(`Movie ${id} failed to load:`, err);
          return of(null);
        }),
      ),
    );

    return forkJoin(requests).pipe(map((results) => results.filter((m): m is Movie => m !== null)));
  }

  private getCollectionsSync(): LocalCollection[] {
    const collections = localStorage.getItem(STORAGE_KEY);
    return collections ? JSON.parse(collections) : [];
  }

  private saveCollections(collections: LocalCollection[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  }

  setCurrentCollection(collection: LocalCollection): void {
    this.currentCollection.next(collection);
  }

  getCurrentCollection(): Observable<LocalCollection | null> {
    return this.currentCollection.asObservable();
  }

  clearCurrentCollection(): void {
    this.currentCollection.next(null);
  }
}
