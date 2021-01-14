import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';  //need this for caching

@Injectable()

export class HttpCacheService {
  private requests: any = {};  // we need a property to store our cache. DECLARE it is "any" type
                               // and initialize it with empty "object literal"
  constructor() { }

   // we need a method that will cache the HtttpResponse
   // it has 2 parameters:  the url being requested and the HttpResponse of type "any" that will
   // be cached. This method  has no return type
   put(url: string, response: HttpResponse<any>): void {
     this.requests[url] = response; // this the object being cached to "requests" property
   }

   // return undefined automatically if there is no match to the url that was passed in
   get(url: string): HttpResponse<any> |  undefined {
    return this.requests[url]; // return the value of the url that was passed-in
  }

  // this will let you remove a single item from the cache
  invalidateUrl(url: string): void{
    this.requests[url] = undefined;
  }

  // method to invalidate the whole cache
  invalidateCache(): void {
    this.requests = { }; // this initializes the whole cache with empty object literal
  }

}
