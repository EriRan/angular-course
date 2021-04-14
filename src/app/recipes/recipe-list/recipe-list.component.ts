import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Array<Recipe> = [
    new Recipe('Cool Bread', 'Really cool', 'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg'),
    new Recipe('Mango Lassi', 'Sweet like honey', 'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeWasSelected.emit(recipe);
  }

}
