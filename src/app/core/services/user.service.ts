import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../../config/tmdb.constants';
import { GuestSession } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getGuestSession(): Observable<GuestSession> {
    const url = `${TMDB_BASE_URL}/authentication/guest_session/new`;
    const params = new HttpParams().set('api_key', TMDB_API_KEY);
    return this.http.get<GuestSession>(url, { params });
  }
}
