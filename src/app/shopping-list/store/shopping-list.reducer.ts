import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient,
} from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editenIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Coca Cola', 123),
    new Ingredient('Eggplant', 321),
  ],
  editedIngredient: null,
  editenIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient],
  })),
  on(addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients], // Spread arrays into one array
  })),
  on(updateIngredient, (state, {ingredient}) => ({
    ...state,
    ingredients: state.ingredients.map((existingIngredient, i) =>
      i === state.editenIngredientIndex
        ? ingredient
        : existingIngredient
    ),
    editedIngredient: null,
    editenIngredientIndex: -1,
  })),
  on(deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter(
      (existingIngredient, i) => i !== state.editenIngredientIndex
    ),
  })),
  on(startEdit, (state, { index }) => ({
    ...state,
    editedIngredient: { ...state.ingredients[index] },
    editenIngredientIndex: index,
  })),
  on(stopEdit, (state) => ({
    ...state,
    editedIngredient: null,
    editenIngredientIndex: -1,
  }))
);
