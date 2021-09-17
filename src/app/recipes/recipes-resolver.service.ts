import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, take } from 'side-project/node_modules/rxjs/operators';
import { AppState } from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { fetchRecipes, setRecipes } from './store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState>,
    private recipeService: RecipeService,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (!recipes.length) {
      this.store.dispatch(fetchRecipes());
      return this.actions$.pipe(
        ofType(setRecipes),
        map((action) => {
          console.log(action.recipes);
          return action.recipes;
        }),
        take(1)
      );
    }
    return recipes;
  }
}
