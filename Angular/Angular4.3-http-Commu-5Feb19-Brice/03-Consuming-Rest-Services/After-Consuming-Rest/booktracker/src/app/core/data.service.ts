import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { OldBook } from 'app/models/oldBook';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    // URL to get all readers is /api/readers
    return allReaders;
  }

  getReaderById(id: number): Reader {
    // sample URL to get a reader by ID is /api/readers/1
    return allReaders.find(reader => reader.readerID === id);
  }

  // return type is defined by:  Observable<Book[]>
  getAllBooks(): Observable<Book[]> {
    console.log('Getting all books from the server.');

    // the observable returns a Book array
    // '/api/books' is the url of the API
    // the GET request interprets the body as JSON
    // and returns it. this means the GET method expects
    // the data coming from the GET request as JSON
    // and will automatically maps it in the array of books
    // specified by the <T> parameter of the method in this
    // case <Book[]>
    // the return type of .get is an observable of <T>
    return this.http.get<Book[]>('/api/books');
  }

  // requesting a single book. this is called from edit.component.ts
  getBookById(id: number): Observable<Book> {

    // first parameter is the uri + id
    // 2nd parameter is the http header stuff
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }


  // Using rxjs operators
  // shapes the data before returning the observable
  // we need to import:
  // import { map, tap } from 'rxjs/operators';
  // first use chain the ".pipe'able" operator
  // and pass a comma separated list of  operators
  // to apply to the object coming from the server.
  // "map" is one operator - you pass it a  function that will accept
  //    the "type" currently wrapped in the observable and returned
  //    the data transformed in some way (in this case we use an arrow function)
  //  Example:
  //      map(b => <OldBook>{
  //        bookTitle: b.title,
  //        year: b.publicationYear
  //      }),
  //   the "b" is the book returned from the server
  // "tap" is another operator

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        // the "b" is the book returned from the server and we will map "b" to OldBook instance
        map(b => <OldBook>{
          bookTitle: b.title,
          year: b.publicationYear
        }),
        // tap doesn't transform data but gives you a way to execute a bit of code
        // before the final data shaped observable is returned
        tap(classicBook => console.log(classicBook))
      );
  }

  // POST - the newly created record is added to the response header
  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // PUT
  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // DELETE
  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }

}
