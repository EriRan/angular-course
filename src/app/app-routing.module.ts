import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // loadChildren == please load the code only when it is requested
  // Very interesting syntax
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.module').then((m) => m.RecipesModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
