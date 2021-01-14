import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //ActivatedRoute is used to retrieve the parameter from the activated
                                                          // route service provided by the router
                                                          //We import Router because we need to route using code. See onBack() method below.
import { Subscription }       from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-detail.component.html'
})

export class ProductDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;
    private sub: Subscription;

    //ActivatedRoute is used to retrieve the parameter from the activated route so we declare it as a dependency in the constructor
    //just like productservice
    constructor(private _route: ActivatedRoute,   //needed to retrieve value of parameters passed to product/id: see ngOnInit()
                private _router: Router,          //needed by onBack() method
                private _productService: ProductService ) {
    }

    ngOnInit(): void {
        
        //get the parameter value using 
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

     getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }
    

    //routing using code.
    onBack(): void {
        this._router.navigate(['/products']);
    }
    
     onRatingClicked(message: string): void {
        this.pageTitle = 'Product Detail: ' + message;
    }
}
