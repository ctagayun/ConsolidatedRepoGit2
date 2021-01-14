import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//following imports for exception handling
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IProduct } from './product';
import { ConfigService } from '../api_settings/api-config.service';

@Injectable()
export class ProductService {

    private headers = new Headers({'Content-Type': 'application/json'});

    _baseUrl: string = '';

    private _productUrl = 'api/products/products.json';
    
    constructor(private _http: Http, private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }
    //get all products. Because Http calls are async operations and it's
    //important to note that http calls are single async operations...
    //meaning that the observable sequence returned from the get
    //method is CONTAINS ONLY ONE ELEMENT. THIS ELEMENT IS THE Http response object.
    //The get method automatically maps the response object returned from the 
    //backend server to the DEFINED TYPE.
    //In this example IProduct is the type of data that the Observable is observing.
      getProducts(): Observable<IProduct[]> {
        return this._http.get(this._baseUrl + 'product')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    // getProducts(): Observable<IProduct[]> {
    //     return this._http.get(this._productUrl)
    //         .map((response: Response) => <IProduct[]> response.json())
    //         .do(data => console.log('All: ' +  JSON.stringify(data))) //use do operator for debugging
    //         .catch(this.handleError);
    // }

    //get a specific product by Id
    getProduct(id: number): Observable<IProduct> {
        return this._http.get(this._baseUrl + 'product/' + id )
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
