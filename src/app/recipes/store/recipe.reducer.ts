import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import {
  addRecipe,
  deleteRecipe,
  setRecipes,
  updateRecipe,
} from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const recipeReducer = createReducer(
  initialState,
  on(setRecipes, (state, { recipes }) => ({
    ...state,
    recipes: [...recipes],
  })),
  on(addRecipe, (state, { recipe }) => ({
    ...state,
    recipes: [...state.recipes, recipe],
  })),
  on(updateRecipe, (state, { recipe, index }) => {
    //Interesting usage of spread operator: spread out the original and then replace the original
    //fields with the ones from the payload
    const updatedRecipe = { ...state.recipes[index], ...recipe };
    const updatedRecipes = [...state.recipes];
    updatedRecipes[index] = updatedRecipe;
    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(deleteRecipe, (state, { index }) => ({
    ...state,
    recipes: state.recipes.filter(
      (ignoredRecipe, existingIndex) => existingIndex !== index
    ),
  }))
);
