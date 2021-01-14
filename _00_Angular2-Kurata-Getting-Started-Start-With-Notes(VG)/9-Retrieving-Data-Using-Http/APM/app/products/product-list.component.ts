import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
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
    errorMessage: string;

    products: IProduct[];

    constructor(private _productService: ProductService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    //populating the view by calling the product data service
    //subscribing to the observable returned by our data service - product.service.ts
    //   .subscribe(products => this.products = products, //subscribing to Observable. Populates "products" property
     //                      error => this.errorMessage = <any>error); //<any> is a casting operator to any 
    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => this.products = products, //subscribing to Observable. Populates "products" property
                           error => this.errorMessage = <any>error); //<any> is a casting operator to any data type. executed when Observable returns an error to errorMessage Property
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
