import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  //needed to retrieve activated route  
import { IProduct } from './product';
import { ProductService } from './product.service';
 
@Component({
    templateUrl: './app/products/product-detail.component.html'
})

//we need implements OnInit in the class level in order for the OnInit life cycle hok to work
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private productService: ProductService,
                 private route: ActivatedRoute) { }      //inject the ActivatedRoute

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

   //it is best to retrieve data within the OnInit lifecycle hook
   //retrieve the id from snapshot of the ActivatedRoute directive
   //+this..... cast the id to a number
    ngOnInit(): void {
    
       //the follwing will be replaced by a call to the resolver
       //let id = +this.route.snapshot.params["id"];
       //this.getProduct(id);

       //call to resolver - note we are using snapshot.data  
       //because of the resolver pre-fetching data, the page
       //or component is displayed after thedata has been fetched     
       this.product = this.route.snapshot.data['product'];

    }
}
