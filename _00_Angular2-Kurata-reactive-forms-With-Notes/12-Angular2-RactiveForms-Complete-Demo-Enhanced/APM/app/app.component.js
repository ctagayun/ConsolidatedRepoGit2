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
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = "Acme Product Management";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'pm-app',
            template: "\n    <div>\n        <nav class='navbar navbar-default'>\n            <div class='container-fluid'>\n                <a class='navbar-brand'>{{pageTitle}}</a>\n                <ul class='nav navbar-nav'>\n                    <li><a [routerLink]=\"['/welcome']\">Home</a></li>\n                    <li><a [routerLink]=\"['/products']\">Product List</a></li>\n                    <li><a [routerLink]=\"['/productEdit/0']\">Add Product</a></li>\n                </ul>\n            </div>\n        </nav>\n        <div class='container'>\n            <router-outlet></router-outlet>\n        </div>\n     </div>\n     "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//  <router-outlet></router-outlet> - is a route directive. We place this directive in the
// host component (i.e where the view is going to be displayed)
// Invoke the productEdit component: <li><a [routerLink]="['/productEdit/0']">Add Product</a></li> -
//  the "0" means that when the ProductEdit component
// sees a "0" in the paramter, it means we want to add a new product instead of editing a product
//see product-list.component to see how the "editProduct" is invoked
//# sourceMappingURL=app.component.js.map