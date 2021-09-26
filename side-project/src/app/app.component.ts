import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)",
        })
      ),
      //This works back and forth.
      transition("normal <=> highlighted", animate(300)),
      ,
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          "border-radius": "0",
          transform: "translateX(0) scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          "border-radius": "0",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          "border-radius": "0",
          transform: "translateX(0) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      //From any state to shrunken and back
      transition("shrunken <=> *", [
        style({
          "background-color": "orange",
          "border-radius": "0",
        }),
        animate(
          1000,
          style({
            "border-radius": "50px",
          })
        ),
        animate(500),
      ]),
      ,
    ]),
    trigger("list1", [
      state(
        // in here is a dummy. It is never used
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      // void is a reserved state name where you have an element that wasn't added to the dom in the beginning
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(800),
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            opacity: 0,
            transform: "translateX(100px)",
          })
        ),
      ]),
      ,
    ]),
    trigger("list2", [
      state(
        // in here is a dummy. It is never used
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      // void is a reserved state name where you have an element that wasn't added to the dom in the beginning
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0px)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition("* => void", [
        group([
          animate(
            300,
            style({
              color: "red",
            })
          ),
          animate(
            800,
            style({
              opacity: 0,
              transform: "translateX(100px)",
            })
          ),
        ]),
      ]),
      ,
    ]),
  ],
})
export class AppComponent {
  list = ["Milk", "Sugar", "Bread"];
  state = "normal";
  wildState = "normal";

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    console.log("animate");
    if (this.state === "normal") {
      this.state = "highlighted";
    } else {
      this.state = "normal";
    }
    this.wildState === "normal"
      ? (this.wildState = "highlighted")
      : (this.wildState = "normal");
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  animationStarted(event: Event) {
    console.log(event);
  }

  animationEnded(event: Event) {
    console.log(event);
  }
}
