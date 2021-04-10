import { Component } from '@angular/core';

//Interesting! This is where some variables that are used in this component
@Component({
  selector: 'app-root', //This is the element in index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'gay-course';
}
