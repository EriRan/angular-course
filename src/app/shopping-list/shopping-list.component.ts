import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'node_modules/rxjs';
import { ShoppingListService } from './shopping-list.service';
import { AppState, State } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<State>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
  }

  ngOnDestroy(): void {
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
