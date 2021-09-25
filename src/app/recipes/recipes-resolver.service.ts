import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'side-project/node_modules/rxjs';
import { map, switchMap, take } from 'side-project/node_modules/rxjs/operators';
import { AppState } from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { fetchRecipes, setRecipes } from './store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipe').pipe(
      take(1),
      map((recipeState) => {
        return recipeState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(fetchRecipes());
          return this.actions$.pipe(
            ofType(setRecipes),
            map((action) => {
              console.log(action.recipes);
              return action.recipes;
            }),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
