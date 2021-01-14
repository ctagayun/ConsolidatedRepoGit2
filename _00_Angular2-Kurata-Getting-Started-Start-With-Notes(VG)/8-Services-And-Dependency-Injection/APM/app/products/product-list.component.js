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
//import the custom service
var product_service_1 = require("./product.service");
var ProductListComponent = (function () {
    //private _productService; //to be used by long syntax
    //to inject a service into a component use the "constructor" of the class by specifying the service
    //as parameter to the constructor. Ex. constructor(private _productService: ProductService) {
    //inject dependencies in the constructor. in this case we are injecting the ProductService
    //this is a shortcut. we don't need to create a separate variable - _productService = ProductService
    function ProductListComponent(_productService) {
        this._productService = _productService;
        this.pageTitle = 'Product List';
        this.imageWidth = 50;
        this.imageMargin = 2;
        this.showImage = false;
    }
    //long syntax
    // constructor(productService: ProductService) {
    //   _productService = ProductService;
    // }
    ProductListComponent.prototype.toggleImage = function () {
        this.showImage = !this.showImage;
    };
    //life cycle hooks. It is a great place to retrieve the data
    ProductListComponent.prototype.ngOnInit = function () {
        this.products = this._productService.getProducts();
    };
    ProductListComponent.prototype.onRatingClicked = function (message) {
        this.pageTitle = 'Product List: ' + message;
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        //no need to register the service here because we registered it inthe app.commponent which is the 
        //parent of this component. All we need is a constructor.
        selector: 'pm-products',
        templateUrl: 'app/products/product-list.component.html',
        styleUrls: ['app/products/product-list.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map