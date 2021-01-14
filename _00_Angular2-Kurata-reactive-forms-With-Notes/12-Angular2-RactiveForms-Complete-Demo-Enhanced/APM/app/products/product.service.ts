import { Injectable } from '@angular/core';

//import http service here along with other classes
//we will need later
import { Http, Response, Headers, RequestOptions } from '@angular/http';

//very important in my http async calls
import { Observable } from 'rxjs/Observable';
//import 'rxjs/Rx';

//import the following observable operators
import 'rxjs/add/operator/do'; //for debugging
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProduct } from './product';

//first register this service im product.module
//then import product.module in app.module.ts

@Injectable()
export class ProductService {
    private baseUrl = 'api/products';

    //inject http service in the constructor
    //http service retyrns an observable
    constructor(private http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    //use this techniques shown here anytime you need to retieve data for display in  form, so user can edit that data.
    getProduct(id: number): Observable<IProduct> {
        //if id=0 it means we are adding a new product
        if (id === 0) {
           //it is an add product so return an initialize product form
           //by calling initializeProduct() defined below
           return Observable.of(this.initializeProduct());

           //this method could be used also in lieu of the above
        // return Observable.create((observer: any) => {
        //     observer.next(this.initializeProduct());
        //     observer.complete();
        // });
        };
    
        //if the id is not equal zero, the code builds up the appropriate
        //URL using the parameter "id"
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data))) //the do operator specifies an action to take for each emitted observable.
            .catch(this.handleError);                                       //Here we simply log the data
    }

    deleteProduct(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (product.id === 0) {
            return this.createProduct(product, options);
        }
        return this.updateProduct(product, options);
    }

    private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        product.id = undefined; //this for the in-memory web api service we are using to fake our backend server

        return this.http.post(this.baseUrl, product, options) // all POST to create new record
            .map(this.extractData) //extract the details of the newl created record
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`; //concatenate the id of the record to be updated
        return this.http.put(url, product, options)
            .map(() => product)
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        //calls a json method and returns an object literal containing the JSON data
        let body = response.json();

        //if no data return an empty data.. denoted by {}
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeProduct(): IProduct {
        // Return an initialized object
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''], //init empty array
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
