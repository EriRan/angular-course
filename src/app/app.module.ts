import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { LogEntryComponent } from './log-entry/log-entry.component';

//Some kind of definition file for the component?
//NgModule here is also a decorator
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    LogEntryComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  //Which component should be aware of at the app startup
  bootstrap: [AppComponent],
})
export class AppModule {}
