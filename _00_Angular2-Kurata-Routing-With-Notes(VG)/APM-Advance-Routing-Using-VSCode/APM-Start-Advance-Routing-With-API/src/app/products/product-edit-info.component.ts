import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from './product';

@Component({
    templateUrl: './app/products/product-edit-info.component.html'
})

//Note:  @ViewChild(NgForm) productForm: NgForm; - here we use
//the ViewChild decorator to obtain a reference to the templatw's form
//the form is called productForm defined like this in the html:
// <form class="form-horizontal"
//           novalidate
//           #productForm="ngForm">
export class ProductEditInfoComponent implements OnInit {
    @ViewChild(NgForm) productForm: NgForm;

    errorMessage: string;
    product: IProduct;

    constructor(private route: ActivatedRoute) { }

    //add code to retrieve data from parent route. we could use the snapshot method to 
    //retrieve the product data, but since we are working with the edit page, we know from experience that we'll
    //want to subscribe to the DATA OBSERVABLE instead. That way the code is notified if the user selects
    //the "Add Products" option.
   ngOnInit(): void {
        //we will use this.route which is the activated route and .subscribe to subscribe to the 
        //parent's route data. we provide an anonymous function to the .subscribe () method.
        //the resolved data is passed in to this function - by the lambda (data => ...)

        //Note thisimportant: Where is = data['product'] coming from??? This is coming from the  product.module.ts
        //where we set a resolver to prefetch data and added that to the Product Edit parent route definition (path: 'products/:id/edit')
        //like this:
        //     path: 'products/:id/edit',
        //     component: ProductEditComponent,
        //     resolve:{product: ProductResolver}

        // so because of the above, the child routes (see below) can read THIS RESOLVER DATA FROM THE PARENT ROUTE.
                //   children: [
                //     {
                //         path: '',
                //         redirectTo: 'info',
                //         pathMatch: 'full'
                //     },
                //     {
                //         path: 'info',
                //         component: ProductEditInfoComponent
                //     },
                //     {
                //         path: 'tags',
                //         component: ProductEditTagsComponent
                //     }
                //     ]

        this.route.parent.data.subscribe(data => {
            this.product = data['product'];

            //we make sure we have a reference to the template's form
            //we use this reference to reset the form every time we get a new data...
            //such as when  selecting "Add Product" . Resetting the form clears
            //the form's state including any validation error.
            //Try this - select edit from Product-List and then delete the product name.
            ///This will yeld a validation error. Then go up the menu and select the "Add Product"
            //the validation error dissapears when the Basic Information (product-edit-info component) page is displayed
            if (this.productForm) {
                this.productForm.reset();
            }
        });
    }
}
