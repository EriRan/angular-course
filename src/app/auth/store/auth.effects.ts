import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'side-project/node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { USER_DATA_LOCAL_STORAGE_KEY } from '../auth.constant';
import { AuthService } from '../auth.service';
import { AuthBaseResponseData } from '../auth.types';
import { User } from '../user.model';
import {
  authenticateSuccess,
  authenticateFail,
  loginStart,
  signupStart,
  logout,
  autoLogin,
} from './auth.actions';

const handleAuthentication = (responseData: AuthBaseResponseData) => {
  const expiresInMilliseconds = +responseData.expiresIn * 1000;
  const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);
  const user = new User(
    responseData.email,
    responseData.localId,
    responseData.idToken,
    expirationDate
  );
  localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(user));
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
            tap((responseData) => {
              this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
            }),
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

  authRedirect = createEffect(
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
            tap((responseData) => {
              this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
            }),
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

  authLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        // Can also add multiple different actions in ofType
        ofType(logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem(USER_DATA_LOCAL_STORAGE_KEY);
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        const localStorageUser = localStorage.getItem(
          USER_DATA_LOCAL_STORAGE_KEY
        );
        if (!localStorage) {
          return { type: 'DUMMY' };
        }
        const parsedUser: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorageUser!);
        if (!parsedUser) {
          return { type: 'DUMMY' };
        }
        const userObject: User = new User(
          parsedUser.email,
          parsedUser.id,
          parsedUser._token,
          new Date(parsedUser._tokenExpirationDate)
        );
        if (userObject.token) {
          const expirationDuration =
            new Date(parsedUser._tokenExpirationDate).getTime() -
            new Date().getTime();

          this.authService.setLogoutTimer(expirationDuration);
          return authenticateSuccess({
            email: userObject.email,
            userId: userObject.id,
            token: userObject.id,
            expirationDate: new Date(parsedUser._tokenExpirationDate),
          });
        }
        //WTF
        return { type: 'DUMMY' };
      })
    );
  });

  /**
   * Actions is one big observable
   */
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
