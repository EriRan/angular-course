import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';


export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ index: number, ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  DELETE_INGREDIENT,
  props<{ index: number }>()
);