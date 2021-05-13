import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error("The count is greater than 3!"));
        }
        count++;
      }, 1000);
    });

    this.subscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log("Completed!");
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
