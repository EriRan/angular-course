import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {map} from "rxjs/operators";
import { Post } from "./post.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    //posts.json is a Firebase requirement
    //The angle bracket content defines what comes as a response
    this.http
      .post<{name: string}>(
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
    this.isFetching = true;
    //Gets have no request body
    return this.http
      .get<{ [key: string]: Post}>(
        "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      )
      .pipe(map((response: {[key: string]: Post}) => {
        const postsArray: Array<Post> = [];
        for(const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key});
          }
        }
        return postsArray;
      }))
      .subscribe((posts) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      });
  }
}
