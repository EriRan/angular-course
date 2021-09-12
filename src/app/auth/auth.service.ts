import { Injectable } from '@angular/core';
import { User } from './user.model';
import { USER_DATA_LOCAL_STORAGE_KEY } from './auth.constant';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { authenticateSuccess, logout } from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  autologin() {
    const localStorageUser = localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY);
    if (!localStorage) {
      return;
    }
    const parsedUser: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorageUser!);
    if (!parsedUser) {
      return;
    }
    const userObject: User = new User(
      parsedUser.email,
      parsedUser.id,
      parsedUser._token,
      new Date(parsedUser._tokenExpirationDate)
    );
    if (userObject.token) {
      this.store.dispatch(
        authenticateSuccess({
          email: userObject.email,
          userId: userObject.id,
          token: userObject.id,
          expirationDate: new Date(parsedUser._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(parsedUser._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.store.dispatch(logout());
    localStorage.removeItem(USER_DATA_LOCAL_STORAGE_KEY);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
