import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredientAction, ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients!: [new Ingredient('Ginger', 123), new Ingredient('Tomato', 321)],
};

// state has initialState as the default value
export function shoppingListReducer(state = initialState, action: AddIngredientAction) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload]}
  }
}
