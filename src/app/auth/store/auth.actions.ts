import { createAction, props } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Authentication] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Authentication] Authenticate Fail';

export const LOGIN_START = '[Authentication] Login Start';

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

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const logout = createAction(LOGOUT);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    errorMessage: string;
  }>()
);
