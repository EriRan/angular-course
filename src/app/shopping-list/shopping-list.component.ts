import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'node_modules/rxjs';
import { AppState } from '../store/app.reducer';
import { startEdit } from './store/shopping-list.actions';
import { State } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<State>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {}

  onEditItem(index: number) {
    this.store.dispatch(startEdit({ index }));
  }
}
