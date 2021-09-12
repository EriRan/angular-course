import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import {
  authenticateSuccess,
  authenticateFail,
  loginStart,
  logout,
  signupStart,
  clearError,
} from './auth.actions';

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
  on(
    authenticateSuccess,
    (state, { email, userId, token, expirationDate }) => ({
      ...state,
      user: new User(email, userId, token, expirationDate),
      authenticationError: null,
      loading: false,
    })
  ),
  on(authenticateFail, (state, { errorMessage }) => ({
    ...state,
    authenticationError: errorMessage,
    loading: false,
  })),
  on(clearError, (state) => ({
    ...state,
    authenticationError: null,
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
  on(signupStart, (state) => ({
    ...state,
    authenticationError: null,
    loading: true,
  }))
);
