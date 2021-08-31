import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'side-project/node_modules/rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { addIngredients } from '../shopping-list/store/shopping-list.actions';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  private recipes: Array<Recipe> = [];

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  getRecipes() {
    //Returns a new array that contains exact copy
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(addIngredients({ ingredients: ingredients }));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.emitUpdate();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.emitUpdate();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitUpdate();
  }

  private emitUpdate() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
