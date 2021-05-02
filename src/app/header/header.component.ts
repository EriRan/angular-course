import {Component, EventEmitter, Output} from '@angular/core';

@Component(
  {
    selector: 'app-header',
    templateUrl: 'header.component.html',

  }
)
export class HeaderComponent {
  public isMenuCollapsed = true;
  @Output() featureSelected = new EventEmitter<string>();
}
