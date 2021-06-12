import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {map} from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //posts.json is a Firebase requirement
    this.http
      .post(
        "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        postData
      )
      .subscribe((response) => {
        //No request is sent without subscribe!
        console.log(response);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    //Gets have no request body
    return this.http
      .get(
        "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      )
      .pipe(map(response => {
        const postsArray = [];
        for(const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key});
          }
        }
        return postsArray;
      }))
      .subscribe((posts) => {
        console.log(posts);
      });
  }
}
