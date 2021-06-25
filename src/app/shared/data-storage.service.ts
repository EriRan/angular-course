import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { Recipe } from '../recipes/recipe.model';

//This doesn't have to be added to app.module this way
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    //Put here so it replaces the current content
    return this.http.put("https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/recipes.json", recipes).subscribe((response) => {console.log(response)});
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>("https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/recipes.json").subscribe((recipes => {
      this.recipesService.setRecipes(recipes);
    }))
  }
}
