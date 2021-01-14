"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
//implement PreloadingStrategy
var SelectiveStrategy = (function () {
    function SelectiveStrategy() {
    }
    //the route param provides information about the current route
    //the second param Function is the function that performs the pre-loading
    SelectiveStrategy.prototype.preload = function (route, load) {
        //this is the logic that determines to proload or not.
        //we cll our new data element "preload" set to true or false
        if (route.data && route.data['preload']) {
            //if true returns the load function
            return load();
        }
        //otherwise returns an observable of null
        return Observable_1.Observable.of(null);
    };
    return SelectiveStrategy;
}());
SelectiveStrategy = __decorate([
    core_1.Injectable()
], SelectiveStrategy);
exports.SelectiveStrategy = SelectiveStrategy;
//# sourceMappingURL=selective-strategy.service.js.map