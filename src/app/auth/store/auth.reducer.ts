import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import { onSignup } from "./auth.actions";

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
}

export const authReducer = createReducer(
  initialState,
  on(onSignup, (state, { email, password }) => ({
    ...state,
    state
  })),
);