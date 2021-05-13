import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {

  }

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

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  getRecipes() {
    //Returns a new array that contains exact copy
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
