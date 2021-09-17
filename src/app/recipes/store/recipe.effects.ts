import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { fetchRecipes, setRecipes } from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      // Can also add multiple different actions in ofType
      ofType(fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[] | null>(
          'https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        if (!recipes) {
          return [];
        }
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return setRecipes({ recipes: recipes });
      })
    );
  });
}
