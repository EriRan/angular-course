import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * Condition to check whether current user has access to some router path. It can return a boolean or URLTree for redirection
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((appState) => appState.user),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        //redirect current user into auth if they aren't authenticated
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
