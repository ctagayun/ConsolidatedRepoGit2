import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
//import the custom service
import { ProductService } from './product.service';

@Component({
    //no need to register the service here because we registered it inthe app.commponent which is the 
    //parent of this component. All we need is a constructor.
    selector: 'pm-products',
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    products: IProduct[];

    //private _productService; //to be used by long syntax

    //to inject a service into a component use the "constructor" of the class by specifying the service
    //as parameter to the constructor. Ex. constructor(private _productService: ProductService) {

    //inject dependencies in the constructor. in this case we are injecting the ProductService
    //this is a shortcut. we don't need to create a separate variable - _productService = ProductService
    constructor(private _productService: ProductService) {
       
    }

    //long syntax
    // constructor(productService: ProductService) {
    //   _productService = ProductService;
    // }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    //life cycle hooks. It is a great place to retrieve the data
    ngOnInit(): void {
        this.products = this._productService.getProducts();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
