import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html',
  styles: [
    `
      .afterFourth {
        color: white;
      }
    `,
  ],
})
export class LogEntryComponent implements OnInit {
  @Input() value = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
