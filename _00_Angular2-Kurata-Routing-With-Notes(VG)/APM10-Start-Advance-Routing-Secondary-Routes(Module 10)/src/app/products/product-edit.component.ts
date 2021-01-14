import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    product: IProduct;

// to do manaul validation we need some type of data structure to hold validation
// state of each tab. since we can have any number of tabs let's define a property
//and set its type is a set of key-value pairs where the key is the "tabpath name and the 
//value is true or false."  
   private dataIsValid: { [key: string]: boolean } = {};


    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private router: Router,) { }

  
     //Note: Very Important! If the parameter of the URL is the only that changed,
     //the component is not initialized again. Becaue the NgInit is not execurted again because only
     //the parameter changed, not the URL

     //But how do we watch changes in parameters... we use observable. But how do we do that? Luckily
     //ActivatedRoute exposes "route params"
     ngOnInit(): void {

         //we will comment this out instead we will access the ActivatedRoute service params observable
         //let id = +this.route.snapshot.params["id"];           
         //this.getProduct(id);  

         //let's coomment this out. we will use the data resolver.
        //accessing ActivatedRoute service params observable
        //this will be executed everytime the parameter changes
        //this.getProduct(id) will rturn an initialized product object if id=0 (see getProduct) 
        // this.route.params.subscribe(params => {             
        //   let id = +params["id"];           
        //   this.getProduct(id); 
        // });

        //here we are unsing the resolver and pass the product data to the onProductRetrieve() method
       
       // this.onProductRetrieved(this.route.snapshot.data['product']);

       // better code. comment out the above.  here we Watch for changes to the resolve data
       //so that if we are adding a new product, the data will be reinitialized
       //Note: we are only notified of the changes when the resolver re-fetches the data.
       //we won't receive notification if our code changes that data. for example,
       //if we are on preductEdit page and the user selects "Add Product", we will 
       //get a notification when the reolver fetches the initialized product. if we modify one of the product 
       //properties such as changing the product name, we will not get a notification.
       this.route.data.subscribe(data => {             
              this.onProductRetrieved(data['product']);
         });

         
    }

    //    getProduct(id: number): void {
    //     this.productService.getProduct(id)
    //         .subscribe(
    //             (product: IProduct) => this.onProductRetrieved(product),
    //             (error: any) => this.errorMessage = <any>error
    //         );
    // }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    //when save button is click, call isValid(null) method passing in null
    //to mean check all tabs
    saveProduct(): void {
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }

        // Navigate back to the product list
        this.router.navigate(["/products"])

    }

    //this method takes in the path of the target tab to validate.
     isValid(path: string): boolean {
        this.validate();

        //if the path is not null, validate this path only
        if (path) {
            return this.dataIsValid[path];
        }

        //otherwise if it is null, check all paths in the dataIsValid key-value pair data structure
        //then the method checks the entry on the key-vale pair data structure and returns
        //true if all tabs are true
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    validate(): void {
        // Clear the validation object each time we do validation
        //to make sure we have a fresh key-value pair
        this.dataIsValid = {};

        // 'info' tab - then we add te logic to check our validation for the
        //info tab elements and then stores true or false as the value of the key-value pair
        //data structure
        if (this.product.productName &&
            this.product.productName.length >= 3 &&
            this.product.productCode) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.product.category &&
            this.product.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
    
}
