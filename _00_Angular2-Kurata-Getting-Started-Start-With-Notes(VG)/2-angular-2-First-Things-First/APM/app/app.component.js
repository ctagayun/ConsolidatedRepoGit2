"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//third we need to import what we need from any third party library, from our modules or from angular itself
//it requires an import keyword followed by the member name and module path
//the path to the module path must be enclosed in quotes and it is case sensitive and need to specify file extension
var core_1 = require("@angular/core");
//second use Component decorator to define the component metadata which includes the HTML for the component's template
//be sure to prefix the decorator with an @ sign
//since decorators are functions ad a parenthesis and pass in appropriate object literals in this example a json object 
//enclosed in brackets as function arguments.
var AppComponent = (function () {
    //first create a class with code to support the view
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'pm-app',
            //selector property is not needed if the component is not used in any HTML
            template: '<h1>Angular2: Getting Started</h1>' //use template property to define the view of the HTML. We call
            //this a directive. A directive is basically a custom HTML element.
        })
        //first create a class with code to support the view
    ], AppComponent);
    return AppComponent;
}()); // class name is PascalCasing. Always append "Component" to the name 
exports.AppComponent = AppComponent;
// and use "export" keyword to makethe class importable by other parts of the application
// then add data proporties in camel case
// create appropriate logic in the methods (alse use camel case for method names)
//# sourceMappingURL=app.component.js.map