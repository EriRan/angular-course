import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipeEffects } from './recipes/store/recipe.effects';

// Some kind of definition file for the component?
// NgModule here is also a decorator
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  // Which component should be aware of at the app startup
  bootstrap: [AppComponent],
})
export class AppModule {}
