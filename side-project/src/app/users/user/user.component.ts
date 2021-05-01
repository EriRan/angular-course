import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };
    //params vs. snapshot
    //Params is an observable. We can observe it by subscribing to it
    //Oh wow this is the one I know
    //Whenever new data is sent (parameters change), we execute the function again
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'],
        this.user.name = params['name']
      }
    )
  }
}
