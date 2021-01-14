import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['./app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    products: IProduct[];

    constructor(private _productService: ProductService, 
                private route: ActivatedRoute) { }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {

        // reading the queryParams. we check for empty string to handle the case when the filterBy
        //is undefined such as when this page is first displayed
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy')); 
        console.log("About to call _productService.getProducts");    
        this._productService.getProducts()
        .subscribe(products => this.products = products,
                   error => this.errorMessage = <any>error);
    }
}