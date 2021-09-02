import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthBaseResponseData, AuthLoginResponseData } from './auth.types';
import { User } from './user.model';
import { Router } from '@angular/router';
import { USER_DATA_LOCAL_STORAGE_KEY } from './auth.constant';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { login, logout } from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  signup(email: string, password: string): Observable<AuthBaseResponseData> {
    return this.http
      .post<AuthBaseResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseApiKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => this.handleError(errorResponse)),
        tap((responseData) => this.handleAuthentication(responseData))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthLoginResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseApiKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => this.handleError(errorResponse)),
        tap((responseData) => this.handleAuthentication(responseData))
      );
  }

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
        login({
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
    this.router.navigate(['/auth']);
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

  private handleAuthentication(responseData: AuthBaseResponseData) {
    const expiresInMilliseconds = +responseData.expiresIn * 1000;
    const expirationDate = new Date(
      new Date().getTime() + expiresInMilliseconds
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );
    this.store.dispatch(
      login({
        email: responseData.email,
        userId: responseData.localId,
        token: responseData.idToken,
        expirationDate: new Date(expirationDate),
      })
    );
    this.autoLogout(expiresInMilliseconds);
    //Serialize javascript object into a json string
    localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('This email already exists!');
      case 'INVALID_EMAIL':
        return throwError('Invalid email provided');
      case 'EMAIL_NOT_FOUND':
        return throwError('Invalid credentials (Email not found)');
      case 'INVALID_PASSWORD':
        return throwError('Invalid credentials (Password invalid)');
      default:
        return throwError('Unknown error!');
    }
  }
}
