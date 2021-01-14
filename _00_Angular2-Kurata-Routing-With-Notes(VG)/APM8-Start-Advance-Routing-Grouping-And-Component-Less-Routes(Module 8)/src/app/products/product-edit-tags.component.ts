import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';

@Component({
    templateUrl: './app/products/product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {
    errorMessage: string;
     newTags = '';
     product: IProduct;

    constructor(private route: ActivatedRoute) { }

    //Subscribe to the ActivatedROute parent's data observable. In the passed-in anonymous function, I set the local product
    //property to the product data from the route. This is now sharing the same product instance
    //as the parent component and the other child route (Product-Edit.Component). This is important because our parent
    //component still contains the code for saving changes to the product. Any changes to the product instance in any child component
    //is reflected in te parent componen's product instance. Let's check that out. Click "Basic Info" tab edit the product data
    // and click save. you will note that the changes are reflected in the product-list.component.
    ngOnInit(): void {
          this.route.parent.data.subscribe(data => {
            this.product = data['product'];
        });
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        this.product.tags.splice(idx, 1);
    }
}
