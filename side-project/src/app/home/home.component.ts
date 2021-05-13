import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    const customIntervalObservable = new Observable((observer) => {
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

    //Wow now we are using pipe!
    this.subscription = customIntervalObservable
      .pipe(
        //These two are operators. They can modify the data before it is handled in the subscription
        filter((data) => {return data > 0}),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          alert(error.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
