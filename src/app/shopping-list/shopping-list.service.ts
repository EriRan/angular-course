import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Array<Ingredient> = [
    new Ingredient('Ginger', 123),
    new Ingredient('Tomato', 321),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    //Dot dot dot is a spread operator. Turns an array into multiple pararameters
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
