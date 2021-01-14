"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Step 3: do your imports
//importing an angular 2.0 library module
//here we are importing a library memeber name  called  Component which is a function
var core_1 = require("@angular/core");
//Step 2: Create the metadata
//this is the metadata for the c# component class we called AppComponent
//the selector is a directive which says that AppComponent class is to be referenced as "pm-app" in the html
//it also defines the view that the AppComponent class will populate 
//a class becomes a component when we give it a @component metadata.
//we define the metadata buy using the @Component() function
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = "Product Management System";
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'pm-app',
        template: "\n    <div><h1>{{pageTitle}}</h1>\n        <div>My First Component</div>\n    </div>\n    "
    })
    //Step 1.
    //the component name is AppComponent
    //our class has an "export" keyword our class is now a module and therefore will be loaded
    //by our module loader no need to add a script tag for it. 
    //the next step is to define a template associated with this component class. How do we do that?
    //We do that by metadata (see @component). Angular needs that metadata to instantiate that component
    //and construct the view
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map