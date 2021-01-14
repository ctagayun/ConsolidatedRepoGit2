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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
//because this class guard is a service, we need to register the service
//with angular's injector
var ProductDetailGuard = (function () {
    function ProductDetailGuard(_router) {
        this._router = _router;
    }
    //implementing canActivate() guard
    //our guard is meant to prevent routing to /products if id is NaN or id is less than 1
    //the ActivatedRouteSnapshot gives us the activated route snapshot. The activated route snap shot
    //contains the information about a route at any particular moment in time
    ProductDetailGuard.prototype.canActivate = function (route) {
        //the product detail url is comprised of two segments...product/requested id  product is index 0, id is index 1
        //we only care about the id so we pull the path from  index of 1
        //the + sign converts the url to string
        var id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');
            this._router.navigate(['/products']); //we need the router so we import it above
            return false;
        }
        ;
        return true;
    };
    ProductDetailGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ProductDetailGuard);
    return ProductDetailGuard;
}());
exports.ProductDetailGuard = ProductDetailGuard;
var ProductEditGuard = (function () {
    function ProductEditGuard() {
    }
    ProductEditGuard.prototype.canDeactivate = function (component) {
        if (component.productForm.dirty) {
            var productName = component.productForm.get('productName').value || 'New Product';
            return confirm("Navigate away and lose all changes to " + productName + "?");
        }
        return true;
    };
    ProductEditGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ProductEditGuard);
    return ProductEditGuard;
}());
exports.ProductEditGuard = ProductEditGuard;
//# sourceMappingURL=product-guard.service.js.map