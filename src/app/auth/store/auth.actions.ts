import { createAction, props } from '@ngrx/store';

export const ON_SIGNUP = 'ON_SIGNUP';

export const onSignup = createAction(
  ON_SIGNUP,
  props<{ email: string; password: string }>()
);
