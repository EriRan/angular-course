import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthBaseResponseData, AuthLoginResponseData } from './auth.types';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string): Observable<AuthBaseResponseData> {
    return this.http
      .post<AuthBaseResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxCjtBUZUEHOIaiJ_DiC5G75vDEjw6rF8',
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxCjtBUZUEHOIaiJ_DiC5G75vDEjw6rF8',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => this.handleError(errorResponse)),
        tap((responseData) => this.handleAuthentication(responseData))
      );
  }

  autologin() {
    const localStorageUser = localStorage.getItem('userData');
    if (!localStorage) {
      return;
    }
    const parsedUser: {email: string, id: string, _token: string, _tokenExpiration: string} = JSON.parse(localStorageUser!);
    const userObject: User = new User(
      parsedUser.email,
      parsedUser.id,
      parsedUser._token,
      new Date(parsedUser._tokenExpiration)
    )
    if (userObject.token) {
      this.user.next(userObject);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(responseData: AuthBaseResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );
    this.user.next(user);
    //Serialize javascript object into a json string
    localStorage.setItem('userData', JSON.stringify(user));
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
