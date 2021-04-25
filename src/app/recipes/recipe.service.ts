import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Array<Recipe> = [
    new Recipe(
      'Cool Bread',
      'Really cool',
      'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg',
      [new Ingredient('Flour', 34), new Ingredient('Salt', 6)]
    ),
    new Recipe(
      'Mango Lassi',
      'Sweet like honey',
      'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg',
      [new Ingredient('Mango', 2)]
    ),
  ];

  getRecipes() {
    //Returns a new array that contains exact copy
    return this.recipes.slice();
  }
}
