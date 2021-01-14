import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// import the cache service that we created
import { HttpCacheService } from 'app/core/http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // pass along non-cacheable requests and invalidate cache
    // the if checks if it is a GET
    if (req.method !== 'GET') {
      console.log(`Invalidating cache: ${req.method} ${req.url}`);

      // because it is a GET invalidate the whole cache
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    // if it is a 'GET' then do the following

    //  retrieve a cached response using the url and assign it to cachedResponse property
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    // if the cache item was successfully retrieved, log and then return cached response
    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`); // log url
      console.log(cachedResponse); // log the value of the cached item

      // then wrap it in an observable  using the "of" rxjs method and return the retrieved cache.
      // one thing to note here is I am returning a value without calling "next.handle" as you see
      // in the other interceptors that I have written. because you are not required to pass the request
      // along to the "NEXT" interceptor if you already have the value you want to return as I
      // do here.
      return of(cachedResponse);
    }

    // now if i get a valid response from the cache,
    // i need to send request to server and add the subsequent response to cache.
    // I send it to the server by passing the request to "next.handle"
    // and then processing the response using the same technique i used in other module
    // (i use the rxjs tap operator)  and see if the http event passed-in is
    // an HttpResponse. If so i log it and then add the event in the cache by calling the
    // cacheService.put.
    // The response is then returned from this interceptor and makes it back to the
    // calling code.
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Adding item to cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      );

  }
}
