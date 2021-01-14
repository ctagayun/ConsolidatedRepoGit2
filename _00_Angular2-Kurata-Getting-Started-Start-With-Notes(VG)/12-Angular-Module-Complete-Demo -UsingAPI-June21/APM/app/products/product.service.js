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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
//following imports for exception handling
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var api_config_service_1 = require("../api_settings/api-config.service");
var ProductService = (function () {
    function ProductService(_http, configService) {
        this._http = _http;
        this.configService = configService;
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this._baseUrl = '';
        this._productUrl = 'api/products/products.json';
        this._baseUrl = configService.getApiURI();
    }
    //get all products. Because Http calls are async operations and it's
    //important to note that http calls are single async operations...
    //meaning that the observable sequence returned from the get
    //method is CONTAINS ONLY ONE ELEMENT. THIS ELEMENT IS THE Http response object.
    //The get method automatically maps the response object returned from the 
    //backend server to the DEFINED TYPE.
    //In this example IProduct is the type of data that the Observable is observing.
    ProductService.prototype.getProducts = function () {
        return this._http.get(this._baseUrl + 'product')
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    // getProducts(): Observable<IProduct[]> {
    //     return this._http.get(this._productUrl)
    //         .map((response: Response) => <IProduct[]> response.json())
    //         .do(data => console.log('All: ' +  JSON.stringify(data))) //use do operator for debugging
    //         .catch(this.handleError);
    // }
    //get a specific product by Id
    ProductService.prototype.getProduct = function (id) {
        return this._http.get(this._baseUrl + 'product/' + id)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    ProductService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, api_config_service_1.ConfigService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map