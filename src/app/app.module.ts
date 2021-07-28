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

// Some kind of definition file for the component?
// NgModule here is also a decorator
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  // Which component should be aware of at the app startup
  bootstrap: [AppComponent],
})
export class AppModule {}
