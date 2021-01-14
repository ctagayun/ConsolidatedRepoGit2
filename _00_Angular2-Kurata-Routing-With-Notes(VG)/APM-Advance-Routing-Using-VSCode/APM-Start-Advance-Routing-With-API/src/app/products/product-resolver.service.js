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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var product_service_1 = require("./product.service");
//thj is a service so decorate it with @injectable
var ProductResolver = (function () {
    function ProductResolver(productService, router) {
        this.productService = productService;
        this.router = router;
    }
    //this method takes in ActivatedRouteSnapshot and RouterStateSnapShot
    //returns an Observale of T in this case IProduct - to return a single product
    ProductResolver.prototype.resolve = function (route, state) {
        //retrieving the parameter from the route by using the ActivatedRouteSnapshot
        //just like we did in the last module by accessing it's "params array and request the "Id" 
        //parameter. We add + sign to convert to a number.
        var _this = this;
        //since this resolver is a service we need to register it in the angular module
        var id = route.paramMap.get('id');
        //error handling. first check it it is a number
        if (isNaN(+id)) {
            console.log("Product id was not a number: " + id);
            this.router.navigate(['/products']);
            return Observable_1.Observable.of(null);
        }
        //more error handling. the map operator returns the value of 
        //the observable so we do not need "Observable.of here"
        //we add a catch operator to catch any retrieval errors.
        console.log("About to get product from the resolver");
        return this.productService.getProduct(+id)
            .map(function (product) {
            if (product) {
                console.log("Got product from the resolver and returning it.");
                console.log("Returned Product = " + product);
                return product;
            }
            console.log("Product was not found: " + id);
            _this.router.navigate(['/products']);
            return null;
        })
            .catch(function (error) {
            console.log("Retrieval error: " + error);
            _this.router.navigate(['/products']);
            return Observable_1.Observable.of(null); //returns an Observable of null
        });
    };
    return ProductResolver;
}());
ProductResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.Router])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product-resolver.service.js.map