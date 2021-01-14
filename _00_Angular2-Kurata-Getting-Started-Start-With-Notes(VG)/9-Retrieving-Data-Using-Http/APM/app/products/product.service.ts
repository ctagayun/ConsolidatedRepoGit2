import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'; //operator we need in Observable - we need one import statement for each operator we need
import 'rxjs/add/operator/do'; //operator we need in Observable
import 'rxjs/add/operator/map'; //operator we need in Observable

import { IProduct } from './product';

@Injectable()
export class ProductService {
    //this is the service we are trying to access. To access a real service change this to the url of that service
    private _productUrl = 'api/products/products.json';  

    //injecting http service
    constructor(private _http: Http) {}

    //return value is a generic observable in this case an array of type IProduct
    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]> response.json()) //the map() translates/cast the "response" object into an array of IProducts
            .do(data => console.log('All: ' +  JSON.stringify(data)))  //by using "data" do() method allows you to peek/inspect/log  the data
            .catch(this.handleError); //exception handling method defined below
    }

    //error handling method
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    //Note: the last step in setting up this service is to subscribe to the
    //observables by using x.subscribe() function in the product-list.component.ts
}
