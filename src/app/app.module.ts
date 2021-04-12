import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//Some kind of definition file for the component?
//NgModule here is also a decorator
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  //Which component should be aware of at the app startup
  bootstrap: [AppComponent],
})
export class AppModule {}
