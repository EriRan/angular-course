import { Recipe } from "./recipe.model";

export class RecipeService {
    private recipes: Array<Recipe> = [
        new Recipe('Cool Bread', 'Really cool', 'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg'),
        new Recipe('Mango Lassi', 'Sweet like honey', 'https://en.wikipedia.org/wiki/Sourdough#/media/File:Home_made_sour_dough_bread.jpg')
      ];

      getRecipes() {
          //Returns a new array that contains exact copy
          return this.recipes.slice();
      }
}