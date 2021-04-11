import { Component, OnInit } from '@angular/core';

@Component({
  //Selector defines a way of how the component is added to the html. It can be added
  //to a element by a class name, as an attribute or just with its own element tag.
  //Selecting by id is not supported
  //selector: '[app-servers]',
  selector: '.app-servers',
  template: `<app-server></app-server><app-server></app-server>`,
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
