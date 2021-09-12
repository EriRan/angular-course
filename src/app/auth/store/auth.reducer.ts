import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import { authenticateSuccess, authenticateFail, loginStart, logout, signupStart } from './auth.actions';

export interface State {
  user: User | null;
  authenticationError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authenticationError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  //TODO
  on(signupStart, (state, { email, password }) => ({
    ...state,
    state,
  })),
  on(authenticateSuccess, (state, { email, userId, token, expirationDate }) => ({
    ...state,
    user: new User(email, userId, token, expirationDate),
    authenticationError: null,
    loading: false,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
  })),
  on(loginStart, (state) => ({
    ...state,
    authenticationError: null,
    loading: true,
  })),
  on(authenticateFail, (state, { errorMessage }) => ({
    ...state,
    authenticationError: errorMessage,
    loading: false,
  }))
);
