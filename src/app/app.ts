import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { GuestSession } from './core/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { TMDB_LOCAL_STORAGE } from './config/tmdb.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'movies';
  private guestSessionId: string = '';
  private lang: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initializeLang();
    this.initializeGuestSession();
  }

  private initializeGuestSession(): void {
    const storedId = localStorage.getItem(TMDB_LOCAL_STORAGE);
    if (storedId) {
      this.guestSessionId = storedId;
    } else {
      this.userService.getGuestSession().subscribe((gs: GuestSession) => {
        this.guestSessionId = gs.guest_session_id;
        localStorage.setItem(TMDB_LOCAL_STORAGE, gs.guest_session_id);
      });
    }
  }

  private initializeLang() {
    let lang = localStorage.getItem('lang') || '';

    if (lang === '' && !lang) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      lang = 'en';
    }
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }

  switchLang(lang: 'en' | 'fr') {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }

  get hasPopupRoute(): boolean {
    return this.router.url.includes('(popup:');
  }
}
