import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
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
        postData,
        {
          observe: "response",
        }
      )
      .subscribe(
        (responseData) => {
          
        },
        (error: HttpErrorResponse) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");
    return this.http
      .get<{ [key: string]: Post }>(
        "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          params: searchParams,
        }
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
        }),
        catchError((errorResponse) => {
          //Could log the error here in some kind of analytics system
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    //This seemed to return just an observable with null content
    return this.http.delete(
      "https://angular-course-9fe36-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      {
        observe: "events"
      }
    ).pipe(
      tap(event => {
        //For some special kind of APIs?
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
        if (event.type === HttpEventType.Sent) {
          console.log(event.type);
        }
        return console.log(event);
      })
    );
  }
}
