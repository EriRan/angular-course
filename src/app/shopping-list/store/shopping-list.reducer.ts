import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Ginger', 123), new Ingredient('Tomato', 321)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, {Ingredient}) => ({
    ...state,
    Ingredient
  }))
);
