import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const sessionId = localStorage.getItem('tmdb_guest_session');
    if (sessionId) {
      return true;
    }

    return this.router.parseUrl('/');
  }
}
