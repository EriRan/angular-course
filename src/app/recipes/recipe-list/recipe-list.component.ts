import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Array<Recipe> = [
    new Recipe('Cool Bread', 'Really cool', 'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
