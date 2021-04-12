import { Component, OnInit } from '@angular/core';

@Component({
  //Selector defines a way of how the component is added to the html. It can be added
  //to a element by a class name, as an attribute or just with its own element tag.
  //Selecting by id is not supported
  //selector: '[app-servers]',
  selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName: string = '';
  serverCreated = false;
  servers = ['TestServer', 'TestServer2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {}

  onCreateServer(): void {
    this.serverCreated = true;
    this.serverCreationStatus =
      'Server was created. Name is: ' + this.serverName;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event): void {
    if (!event || !event.currentTarget) {
      return;
    }
    if (event.currentTarget instanceof HTMLInputElement) {
      this.serverName = (event.currentTarget as HTMLInputElement).value;
    }
  }
}
