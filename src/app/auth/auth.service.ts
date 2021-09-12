import { Injectable } from '@angular/core';
import { User } from './user.model';
import { USER_DATA_LOCAL_STORAGE_KEY } from './auth.constant';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { authenticateSuccess, logout } from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer?: any | null;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
