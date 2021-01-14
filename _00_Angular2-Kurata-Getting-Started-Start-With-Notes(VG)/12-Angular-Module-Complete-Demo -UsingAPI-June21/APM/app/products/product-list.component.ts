import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    products: IProduct[];

    constructor(private _productService: ProductService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    //Note: Observables (see product.service.ts) are Lazy it means it doesn't
    //emit values until you SUBSCRIBE TO THE OBSERVABLE as in the following example.
    //the.subscribe kicks in the getProducts method
    //the products => this.products = products is the function to be executed 
    //after a successfull get that emits data... the data emitted is the "products" 
    //(the variable on the left of the lambda expression)
    //the  error => this.errorMessage = <any>error); is the function executed 
    // on a an error condition (that's is when "error" is emitted. it is the variable 
   //on the left of the lambda expression)
    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => {
                            this.products = products;
                         //   this.filteredProducts = this.products;
                           },
                           error => this.errorMessage = <any>error); //this is a casting
                                                  // operator... we are casting the error
                                                  //returned from the observable to the
                                                  //"any" data type
    }

    //this invoked by this property binding in product-list.component.html like this:
    //(ratingClicked)='onRatingClicked($event)'>
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
