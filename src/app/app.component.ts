import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/store/auth.actions';
import { AppState } from './store/app.reducer';

// Interesting! This is where some variables that are used in this component
@Component({
  selector: 'app-root', // This is the element in index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // This can also be just style if you want to add inline style. I think inline styles are gay
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(autoLogin());
      console.log('On browser');
    } else {
      console.log('On Server');
    }
  }
}
