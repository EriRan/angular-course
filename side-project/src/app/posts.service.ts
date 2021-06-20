import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable()
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content,
    };
    // Send Http request
    //posts.json is a Firebase requirement
    //The angle bracket content defines what comes as a response
    return this.http
      .post<{ name: string }>(
        "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        postData
      )
      .subscribe(
        () => {this.fetchPosts();},
        (error: HttpErrorResponse) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
      )
      .pipe(
        map((response: { [key: string]: Post }) => {
          const postsArray: Array<Post> = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postsArray.push({ ...response[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  deletePosts() {
    //This seemed to return just an observable with null content
    return this.http.delete(
      "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
    );
  }
}
