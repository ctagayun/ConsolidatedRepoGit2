import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()


export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

  constructor(private dataService: DataService) { }

  // this resolver returns either an observable of array of Books or BookTrackerError
  // implement error handling here
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks()
      .pipe(
        // we use the "of" method to return a new observable that wraps up the error. This is
        // one of the main idea here. this will allow the error to be passed to the component
        catchError(err => of(err))
      );
  }

}
