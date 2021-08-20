import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { addIngredient, addIngredients, deleteIngredient, updateIngredient } from './shopping-list.actions';

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
  })),
  on(updateIngredient, (state, {index, ingredient}) => ({
    ...state,
    ingredients: state.ingredients.map((existingIngredient, i) => i === index ? ingredient : existingIngredient)
  })),
  on(deleteIngredient, (state, {index}) => ({
    ...state,
    ingredients: state.ingredients.filter((existingIngredient, i) => i !== index)
  }))
);
