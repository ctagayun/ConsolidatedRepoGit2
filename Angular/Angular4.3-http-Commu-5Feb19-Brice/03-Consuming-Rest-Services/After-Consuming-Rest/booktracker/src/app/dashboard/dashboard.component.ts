import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title) { }

  // to receive the data returned by the observable,
  // we need to subscribe to the observable returned
  // by the function getAllBooks.

  // Observables has a method called "Subscribe"
  // so we can chain to the function call
  // by doing .subscribe
  // "subscribe" calls 3 callback fucntions as
  // parameters: data, err, and completion denoted by "()"


  ngOnInit() {
    this.dataService.getAllBooks()
      .subscribe(
        (data: Book[]) => this.allBooks = data, // the first function pass  is the  data from the server as a parameter
                                                // it will be the array of books and assign
                                                // it to the "allBooks" property defined above
        (err: any) => console.log(err),  // the second function returned is any "errors" that occured

        () => console.log('All done getting books.') // the 3rd function handler pass is the "completion" handler
      );
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: void) => {
          let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
