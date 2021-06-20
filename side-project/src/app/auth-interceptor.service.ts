import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  //This steps into a request flow: Is ran right before request leaves the application to the API
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("The request is on its way");
    //Let's modify the request. Cannot modify the received request directly
    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "Hello"),
    });

    //Now let the request go to the API
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("Response arrived!");
        }
        console.log(event);
      })
    );
  }
}
