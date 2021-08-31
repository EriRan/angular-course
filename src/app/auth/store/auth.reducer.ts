import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import { login, logout, onSignup } from './auth.actions';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  //TODO
  on(onSignup, (state, { email, password }) => ({
    ...state,
    state,
  })),
  on(login, (state, { email, userId, token, expirationDate }) => ({
    ...state,
    user: new User(email, userId, token, expirationDate),
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
  }))
);
