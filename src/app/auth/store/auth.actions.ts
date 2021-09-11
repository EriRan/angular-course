import { createAction, props } from '@ngrx/store';

export const LOGIN_START = "[Authentication] Login Start"
export const LOGIN_FAIL = "[Authentication] Login Fail"
export const ON_SIGNUP = '[Authentication] On signup';
export const LOGIN = '[Authentication] Login';
export const LOGOUT = '[Authentication] Logout';

export const onSignup = createAction(
  ON_SIGNUP,
  props<{ email: string; password: string }>()
);

export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const login = createAction(
  LOGIN,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const logout = createAction(
  LOGOUT
);

export const loginFail = createAction(
  LOGIN_FAIL,
  props<{
    errorMessage: string;
  }>()
);