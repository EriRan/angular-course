import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient, addIngredients } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Coca Cola', 123), new Ingredient('Eggplant', 321)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, {ingredient}) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient]
  })),
  on(addIngredients, (state, {ingredients}) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients] // Spread arrays into one array
  }))
);
