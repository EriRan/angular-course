import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

// Interesting! This is where some variables that are used in this component
@Component({
  selector: 'app-root', // This is the element in index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // This can also be just style if you want to add inline style. I think inline styles are gay
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.autologin();
  }

}
