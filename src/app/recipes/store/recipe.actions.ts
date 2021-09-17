import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{
    recipes: Recipe[];
  }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES);
