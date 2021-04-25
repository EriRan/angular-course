import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputReference!: ElementRef;
  @ViewChild('amountInput') amountInputReference!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem(): void {
    const ingredientName = this.nameInputReference.nativeElement.value;
    const ingredientAmount = this.amountInputReference.nativeElement.value;
    this.shoppingListService.addIngredient(
      new Ingredient(ingredientName, ingredientAmount)
    );
  }
}
