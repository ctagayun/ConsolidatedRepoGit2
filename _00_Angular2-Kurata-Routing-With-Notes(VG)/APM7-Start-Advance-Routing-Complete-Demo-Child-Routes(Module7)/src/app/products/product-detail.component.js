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
var router_1 = require("@angular/router"); //needed to retrieve activated route  
var product_service_1 = require("./product.service");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(productService, route) {
        this.productService = productService;
        this.route = route;
        this.pageTitle = 'Product Detail';
    } //inject the ActivatedRoute
    ProductDetailComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.productService.getProduct(id).subscribe(function (product) { return _this.product = product; }, function (error) { return _this.errorMessage = error; });
    };
    //it is best to retrieve data within the OnInit lifecycle hook
    //retrieve the id from snapshot of the ActivatedRoute directive
    //+this..... cast the id to a number
    ProductDetailComponent.prototype.ngOnInit = function () {
        //the follwing will be replaced by a call to the resolver
        //let id = +this.route.snapshot.params["id"];
        //this.getProduct(id);
        //call to resolver - note we are using snapshot.data  
        //because of the resolver pre-fetching data, the page
        //or component is displayed after thedata has been fetched     
        this.product = this.route.snapshot.data['product'];
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-detail.component.html'
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map