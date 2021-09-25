import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from '../auth/store/auth.actions';
import { fetchRecipes, storeRecipes } from '../recipes/store/recipe.actions';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isMenuCollapsed = true;
  isAuthenticated = false;
  private userSubscription!: Subscription;
  @Output() featureSelected = new EventEmitter<string>();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(fetchRecipes());
  }

  /**
   * HTML
   */
  onLogout() {
    this.store.dispatch(logout());
  }
}
