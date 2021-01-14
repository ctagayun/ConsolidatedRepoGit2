"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
//ProductEditComponent is the generic paramter which signifies the target of this guard
var ProductEditGuard = (function () {
    function ProductEditGuard() {
    }
    //implement canDeactivate. ProductEditComponent is the generic paramter which signifies the target of this guard
    ProductEditGuard.prototype.canDeactivate = function (component) {
        //check if there is unsaved data
        if (component.isDirty) {
            var productName = component.product.productName || 'New Product';
            //we use angular confirm() method before allowing the user to navigate away. 
            //we use  a BACK TICK to define a template literal and display the product name
            return confirm("Navigate away and lose all changes to " + productName + "?");
        }
        return true;
    };
    return ProductEditGuard;
}());
ProductEditGuard = __decorate([
    core_1.Injectable()
], ProductEditGuard);
exports.ProductEditGuard = ProductEditGuard;
//# sourceMappingURL=product-guard.service.js.map