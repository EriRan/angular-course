import { createAction, props } from '@ngrx/store';

export const ON_SIGNUP = '[Authentication] On signup';
export const LOGIN = '[Authentication] Login';
export const LOGOUT = '[Authentication] Logout';

export const onSignup = createAction(
  ON_SIGNUP,
  props<{ email: string; password: string }>()
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