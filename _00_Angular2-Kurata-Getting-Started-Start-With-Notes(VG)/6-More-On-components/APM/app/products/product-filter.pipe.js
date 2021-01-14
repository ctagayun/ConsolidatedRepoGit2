"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//custom pipe. Make sure add it to the module that needs it. In this case appModule
var core_1 = require("@angular/core");
//Pipe decorator
var ProductFilterPipe = (function () {
    function ProductFilterPipe() {
    }
    //implement transform method to define your own pipe
    //the first parameter to transform is the value with want transformed - e.g. value: IProduct[] array
    //return type is also : IProduct[] 
    //filterBy: string is the transformation criteria provided by the user
    ProductFilterPipe.prototype.transform = function (value, filterBy) {
        //this means if there is a filterBy convert the IProducts[] to lower case otherwise set filterBy to  null
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        //if filter By not null then we filter the list. Otherwise we return the unaltered original value which is
        //our full list of products 
        return filterBy ? value.filter(function (product) {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        }) : value;
    };
    return ProductFilterPipe;
}());
ProductFilterPipe = __decorate([
    core_1.Pipe({
        name: 'productFilter' //name of the pipe
    })
], ProductFilterPipe);
exports.ProductFilterPipe = ProductFilterPipe;
//# sourceMappingURL=product-filter.pipe.js.map