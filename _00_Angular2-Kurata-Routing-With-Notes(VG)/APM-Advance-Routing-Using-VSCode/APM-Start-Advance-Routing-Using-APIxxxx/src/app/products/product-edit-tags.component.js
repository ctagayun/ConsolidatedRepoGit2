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
var ProductEditTagsComponent = (function () {
    function ProductEditTagsComponent(route) {
        this.route = route;
        this.newTags = '';
    }
    //Subscribe to the ActivatedROute parent's data observable. In the passed-in anonymous function, I set the local product
    //property to the product data from the route. This is now sharing the same product instance
    //as the parent component and the other child route (Product-Edit.Component). This is important because our parent
    //component still contains the code for saving changes to the product. Any changes to the product instance in any child component
    //is reflected in te parent componen's product instance. Let's check that out. Click "Basic Info" tab edit the product data
    // and click save. you will note that the changes are reflected in the product-list.component.
    ProductEditTagsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.data.subscribe(function (data) {
            _this.product = data['product'];
        });
    };
    // Add the defined tags
    ProductEditTagsComponent.prototype.addTags = function () {
        var tagArray = this.newTags.split(',');
        this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    };
    // Remove the tag from the array of tags.
    ProductEditTagsComponent.prototype.removeTag = function (idx) {
        this.product.tags.splice(idx, 1);
    };
    return ProductEditTagsComponent;
}());
ProductEditTagsComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-edit-tags.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ProductEditTagsComponent);
exports.ProductEditTagsComponent = ProductEditTagsComponent;
//# sourceMappingURL=product-edit-tags.component.js.map