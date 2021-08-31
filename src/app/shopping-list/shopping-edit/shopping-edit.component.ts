import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'side-project/node_modules/rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  deleteIngredient,
  stopEdit,
  updateIngredient,
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (
          stateData.editenIngredientIndex > -1 &&
          stateData.editedIngredient
        ) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEdit());
  }

  onSubmit(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(
        updateIngredient({ingredient: newIngredient})
      );
    } else {
      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
    }
    this.editMode = false;
    form.reset();
  }

  /**
   * This is more like a cancel. Maybe the instructor has bigger plans for this so I'll just keep it as onClear. It doesn't make sense to me though
   */
  onClear() {
    this.shoppingListForm.reset();
    this.store.dispatch(stopEdit());
  }

  onDelete() {
    this.store.dispatch(deleteIngredient());
  }
}
