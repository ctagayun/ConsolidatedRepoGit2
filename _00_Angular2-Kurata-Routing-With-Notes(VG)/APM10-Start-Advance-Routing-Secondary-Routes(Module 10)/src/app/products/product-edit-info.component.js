"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ProductEditInfoComponent = (function () {
    function ProductEditInfoComponent(route) {
        this.route = route;
    }
    //add code to retrieve data from parent route. we could use the snapshot method to 
    //retrieve the product data, but since we are working with the edit page, we know from experience that we'll
    //want to subscribe to the DATA OBSERVABLE instead. That way the code is notified if the user selects
    //the "Add Products" option.
    ProductEditInfoComponent.prototype.ngOnInit = function () {
        //we will use this.route which is the activated route and .subscribe to subscribe to the 
        //parent's route data. we provide an anonymous function to the .subscribe () method.
        //the resolved data is passed in to this function - by the lambda (data => ...)
        var _this = this;
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
        this.route.parent.data.subscribe(function (data) {
            _this.product = data['product'];
            //we make sure we have a refeence to the template's form
            //we use this reference to reset the form every time we get a new data...
            //such as when  selecting "Add Product" f. Resetting the form clears
            //the form's state including any validation error.
            //Try this - select edit from Product-List and then delete the product name.
            ///This will yeld a validation error. Then go up the menu and select the "Add Product"
            //the validation error dissapears when the Basic Information (product-edit-info component) page is displayed
            if (_this.productForm) {
                _this.productForm.reset();
            }
        });
    };
    return ProductEditInfoComponent;
}());
__decorate([
    core_1.ViewChild(forms_1.NgForm),
    __metadata("design:type", forms_1.NgForm)
], ProductEditInfoComponent.prototype, "productForm", void 0);
ProductEditInfoComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-edit-info.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ProductEditInfoComponent);
exports.ProductEditInfoComponent = ProductEditInfoComponent;
//# sourceMappingURL=product-edit-info.component.js.map