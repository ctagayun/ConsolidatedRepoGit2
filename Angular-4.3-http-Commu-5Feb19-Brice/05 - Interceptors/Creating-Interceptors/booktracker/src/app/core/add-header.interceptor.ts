import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// interceptor are services so we need to add @Injectable
@Injectable()

// import and implement HttpInterceptor
export class AddHeaderInterceptor implements HttpInterceptor {

  // HttpInterceptor interface has only 1 method - "intercept"
  // import HttpHandler
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // send to console the url that was provided as parameter
    console.log(`AddHeaderInterceptor - ${req.url}`);

    // clone the "req" request object
    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {'Content-Type': 'application/json'}
    });

    // pass in the property jsonReq. "next" is a property of type HttpHandler
    return next.handle(jsonReq);
  }

}
