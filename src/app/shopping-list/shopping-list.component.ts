import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<Ingredient> = [
    new Ingredient('Ginger', 123),
    new Ingredient('Tomato', 321),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

}
