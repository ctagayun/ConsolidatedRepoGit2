"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//an angular module imports @angular modules, 3rd party module, component, directive, pipes and even 
//other angular modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router"); //Step1 Routing: Registers the route service and declares the router directives,
//       exposes configured routes
var app_component_1 = require("./app.component");
var welcome_component_1 = require("./home/welcome.component");
var product_module_1 = require("./products/product.module");
var api_config_service_1 = require("./api_settings/api-config.service");
var AppModule = (function () {
    //a module is a class decorated with @NgModule
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            //other angular modules.
            //an angular module can be extended by importing capabilities from other angular modules
            //Note: the importing module cannot access modules that are imported by the module you are importing.
            http_1.HttpModule,
            router_1.RouterModule.forRoot([
                //to the app by passing  
                //an array of routes to the routing module like this. Note all the routes are inside an array
                //if you want to use hash add this at the end of the array {useHash:true}
                { path: 'welcome', component: welcome_component_1.WelcomeComponent },
                { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                { path: '**', redirectTo: 'welcome', pathMatch: 'full' } //denotes a wildcard path. executed if no match to any of the defined routes
            ]),
            product_module_1.ProductModule //is a custom module defined in ./product folder
        ],
        declarations: [
            //it declares each component, directive and pipe that it manages
            //every component, directive and pipe we create must belong to one and only one module.
            //it cannot be declared in otheR modules
            //all declared components, directives and pipes are private by default. we can share however
            //by exporting them
            app_component_1.AppComponent,
            welcome_component_1.WelcomeComponent
        ],
        providers: [api_config_service_1.ConfigService],
        //This array allows us to register service providers
        //at the module level (note there is also a PROVIDERS ARRAY
        //AT THE COMPONENT LEVEL) allowing services at to be injected
        //in the constRuctor of any class in the application
        bootstrap: [app_component_1.AppComponent] //BOOTSTRAP ARRAY:
        //bootstrap array defines the component that is the starting point of the application
        //the bootstrap array should only be used in the ROOT application module
        //an angular module bootstraps our "ROOT" application component. The root component
        //is the component needed to display our first template. Again Bootstrap array is only used
        //in the root module, e.g app.module.ts
    })
    //a module is a class decorated with @NgModule
], AppModule);
exports.AppModule = AppModule;
//an angular module exports @angular modules, 3rd party module, component, directive, pipes and even 
//other angular modules
//an angular module registers service providers with Angular injector making the service to any class 
//in the application 
//# sourceMappingURL=app.module.js.map