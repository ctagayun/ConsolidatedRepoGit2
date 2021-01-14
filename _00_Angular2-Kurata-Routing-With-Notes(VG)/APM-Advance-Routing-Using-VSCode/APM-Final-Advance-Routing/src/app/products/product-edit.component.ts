import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-edit.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string = 'Product Edit';
    errorMessage: string;

    //create the following properties
    private currentProduct: IProduct;
    private originalProduct: IProduct;
    private dataIsValid: { [key: string]: boolean } = {};

    //returns true if the data has changed and false if not.
    get isDirty(): boolean {
        //compares the stringifyied version of the currentProduct with the originalProduct.
        return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
    }

    //getter returns the current product
    get product(): IProduct {
        return this.currentProduct;
    }

    //the setter sets the current product to the passed in IProduct value
    set product(value: IProduct) {
        this.currentProduct = value;
        // Clone the object to retain a copy. it uses the Object.assign to make a copy for comparison purposes later.
        //that's because the parent ProductEditComponent and each child edit component shares the currenProduct object instance that
        //we obtained from the resolver.
        this.originalProduct = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onProductRetrieved(data['product']);
        });
    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        // Adjust the title
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.product.productName} was deleted`);
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

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

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
        this.reset();
        // Navigate back to the product list
        this.router.navigate(['/products']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentProduct = null;
        this.originalProduct = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
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
