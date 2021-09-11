import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'side-project/node_modules/rxjs';
import { switchMap } from 'side-project/node_modules/rxjs/internal/operators/switchMap';
import { environment } from 'src/environments/environment';
import { AuthBaseResponseData } from '../auth.types';
import { login, loginFail, loginStart, LOGIN_START } from './auth.actions';

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
            map((responseData: AuthBaseResponseData) => {
              const expiresInMilliseconds = +responseData.expiresIn * 1000;
              const expirationDate = new Date(
                new Date().getTime() + expiresInMilliseconds
              );
              return login({
                email: responseData.email,
                userId: responseData.localId,
                token: responseData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              let errorMessage = 'Unknown error occurred!';
              if (!errorResponse.error || !errorResponse.error.error) {
                return of(loginFail({errorMessage: errorMessage}))
              }
              switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                  return of(loginFail({errorMessage: 'This email already exists!'}));
                case 'INVALID_EMAIL':
                  return of(loginFail({errorMessage: 'Invalid email provided'}));
                case 'EMAIL_NOT_FOUND':
                  return of(loginFail({errorMessage: 'Invalid credentials (Email not found)'}));
                case 'INVALID_PASSWORD':
                  return of(loginFail({errorMessage: 'Invalid credentials (Password invalid)'}));
                default:
                  return of(loginFail({errorMessage: 'Unknown error!'}));
              }
            })
          );
      })
    );
  });

  authSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(login),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  /**
   * Actions is one big observable
   */
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
