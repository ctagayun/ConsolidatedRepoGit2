import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

//implement PreloadingStrategy
@Injectable()
export class SelectiveStrategy implements PreloadingStrategy {

    //the route param provides information about the current route
    //the second param Function is the function that performs the pre-loading
    preload(route: Route, load: Function): Observable<any> {

        //this is the logic that determines to proload or not.
        //we cll our new data element "preload" set to true or false
        if (route.data && route.data['preload']) {

            //if true returns the load function
            return load();
        }

        //otherwise returns an observable of null
        return Observable.of(null);
    }
}
