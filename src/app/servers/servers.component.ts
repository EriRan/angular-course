import { Component, OnInit } from '@angular/core';

@Component({
  //Selector defines a way of how the component is added to the html. It can be added
  //to a element by a class name, as an attribute or just with its own element tag.
  //Selecting by id is not supported
  //selector: '[app-servers]',
  selector: '.app-servers',
  templateUrl: './servers.component.html',
  styles: [],
})
export class ServersComponent implements OnInit {
  paragraphToggled = false;
  buttonClicks: Array<number> = [];

  constructor() {
  }

  ngOnInit(): void {}

  toggleParagraph(): void {
    if (this.paragraphToggled) {
      this.paragraphToggled = false;
    } else {
      this.paragraphToggled = true;
    }
    this.buttonClicks.push(this.buttonClicks.length + 1);
  }

  getButtonClicksLength(): number {
    return this.buttonClicks.length;
  }
}
