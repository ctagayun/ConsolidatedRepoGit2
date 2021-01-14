import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProduct } from './product';
import { ProductService } from './product.service';

//thj is a service so decorate it with @injectable
@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService,
                private router: Router) { }

    //this method takes in ActivatedRouteSnapshot and RouterStateSnapShot
    //returns an Observale of T in this case IProduct - to return a single product
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<IProduct> {
        
        //retrieving the parameter from the route by using the ActivatedRouteSnapshot
        //just like we did in the last module by accessing it's "params array and request the "Id" 
        //parameter. We add + sign to convert to a number.

        //since this resolver is a service we need to register it in the angular module
      
        let id = route.paramMap.get('id');

        //error handling. first check it it is a number
        if (isNaN(+id)) {
            console.log(`Product id was not a number: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }

        //more error handling. the map operator returns the value of 
        //the observable so we do not need "Observable.of here"
        //we add a catch operator to catch any retrieval errors.
        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null); //returns an Observable of null
            });
    }
}
