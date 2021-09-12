import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'side-project/node_modules/rxjs';
import { switchMap } from 'side-project/node_modules/rxjs/internal/operators/switchMap';
import { environment } from 'src/environments/environment';
import { AuthBaseResponseData } from '../auth.types';
import {
  authenticateSuccess,
  authenticateFail,
  loginStart,
  signupStart,
} from './auth.actions';

const handleAuthentication = (responseData: AuthBaseResponseData) => {
  const expiresInMilliseconds = +responseData.expiresIn * 1000;
  const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);
  return authenticateSuccess({
    email: responseData.email,
    userId: responseData.localId,
    token: responseData.idToken,
    expirationDate: expirationDate,
  });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'Unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(authenticateFail({ errorMessage: errorMessage }));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      return of(
        authenticateFail({
          errorMessage: 'This email already exists!',
        })
      );
    case 'INVALID_EMAIL':
      return of(authenticateFail({ errorMessage: 'Invalid email provided' }));
    case 'EMAIL_NOT_FOUND':
      return of(
        authenticateFail({
          errorMessage: 'Invalid credentials (Email not found)',
        })
      );
    case 'INVALID_PASSWORD':
      return of(
        authenticateFail({
          errorMessage: 'Invalid credentials (Password invalid)',
        })
      );
    default:
      return of(authenticateFail({ errorMessage: 'Unknown error!' }));
  }
};

/**
 * This is like Thunk in React Redux. These need to return observables of actions
 */
@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      // Can also add multiple different actions in ofType
      ofType(loginStart),
      switchMap((authData) => {
        return this.http
          .post<AuthBaseResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseApiKey,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((responseData) => {
              return handleAuthentication(responseData);
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    );
  });

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authenticateSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      // Can also add multiple different actions in ofType
      ofType(signupStart),
      switchMap((action) => {
        return this.http
          .post<AuthBaseResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseApiKey,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((responseData) => {
              return handleAuthentication(responseData);
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    );
  });

  /**
   * Actions is one big observable
   */
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
