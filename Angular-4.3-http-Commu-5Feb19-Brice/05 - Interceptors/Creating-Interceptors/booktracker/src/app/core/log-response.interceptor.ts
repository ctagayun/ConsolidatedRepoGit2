import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponseInterceptor - ${req.url}`);

    // "next" is a property of type "HttpEventType"
    return next.handle(req)
      .pipe(
        tap(event => {
          if(event.type === HttpEventType.Response) { // check if the event type is a "response"
            console.log(event.body);  // log the body of the response
          }
        })
      );
  }
}
