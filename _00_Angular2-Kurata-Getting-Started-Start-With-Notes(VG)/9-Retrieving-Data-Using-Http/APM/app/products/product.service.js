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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch"); //operator we need in Observable - we need one import statement for each operator we need
require("rxjs/add/operator/do"); //operator we need in Observable
require("rxjs/add/operator/map"); //operator we need in Observable
var ProductService = (function () {
    //injecting http service
    function ProductService(_http) {
        this._http = _http;
        //this is the service we are trying to access. To access a real service change this to the url of that service
        this._productUrl = 'api/products/products.json';
    }
    //return value is a generic observable in this case an array of type IProduct
    ProductService.prototype.getProducts = function () {
        return this._http.get(this._productUrl)
            .map(function (response) { return response.json(); }) //the map() translates/cast the "response" object into an array of IProducts
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); }) //by using "data" do() method allows you to peek/inspect/log  the data
            .catch(this.handleError); //exception handling method defined below
    };
    //error handling method
    ProductService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map