import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PagedResponse } from '../models/paging.model';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../../config/tmdb.constants';
import { MovieDetail, RatingResponse } from '../models/movie-details.model';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1): Observable<PagedResponse> {
    const url = `${TMDB_BASE_URL}/search/movie`;
    const params = new HttpParams()
      .set('api_key', TMDB_API_KEY)
      .set('language', 'en-US')
      .set('query', query)
      .set('page', page.toString());
    return this.http.get<PagedResponse>(url, { params });
  }

  discoverMovies(page: number = 1): Observable<PagedResponse> {
    const url = `${TMDB_BASE_URL}/discover/movie`;
    const params = new HttpParams()
      .set('api_key', TMDB_API_KEY)
      .set('language', 'en-US')
      .set('sort_by', 'popularity.desc')
      .set('include_adult', 'false')
      .set('include_video', 'false')
      .set('page', page.toString());
    return this.http.get<PagedResponse>(url, { params });
  }

  getMovieDetails(id: number): Observable<MovieDetail> {
    const url = `${TMDB_BASE_URL}/movie/${id}`;
    const params = new HttpParams().set('api_key', TMDB_API_KEY).set('language', 'en-US');
    return this.http.get<MovieDetail>(url, { params });
  }

  getMovieById(id: number): Observable<Movie> {
    const url = `${TMDB_BASE_URL}/movie/${id}`;
    const params = new HttpParams().set('api_key', TMDB_API_KEY);

    return this.http.get<Movie>(url, { params });
  }

  rateMovie(movieId: number, rating: number, guestSessionId: string): Observable<RatingResponse> {
    const url = `${TMDB_BASE_URL}/movie/${movieId}/rating`;
    const params = new HttpParams()
      .set('api_key', TMDB_API_KEY)
      .set('guest_session_id', guestSessionId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const body = { value: rating };
    return this.http.post<RatingResponse>(url, body, { params, headers });
  }
}
