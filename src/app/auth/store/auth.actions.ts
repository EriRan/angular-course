import { createAction, props } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Authentication] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Authentication] Authenticate Fail';
export const CLEAR_ERROR = '[Authentication] Clear Error';

export const LOGIN_START = '[Authentication] Login Start';
export const AUTO_LOGIN = '[Authentication] Auto Login';

export const SIGNUP_START = '[Authentication] Signup Start';

export const LOGOUT = '[Authentication] Logout';

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const autoLogin = createAction(AUTO_LOGIN);

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const clearError = createAction(CLEAR_ERROR);

export const logout = createAction(LOGOUT);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    errorMessage: string;
  }>()
);
