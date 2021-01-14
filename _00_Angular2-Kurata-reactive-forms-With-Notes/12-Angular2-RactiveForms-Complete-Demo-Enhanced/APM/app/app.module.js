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
//an angular module imports @angular modules, 3rd party module, component, directive, pipes and even 
//other angular modules
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http'); //needed by http data service
var router_1 = require('@angular/router'); //Step1 Routing: Registers the route service and declares the router directives,
//       exposes configured routes
var app_component_1 = require('./app.component');
var welcome_component_1 = require('./home/welcome.component');
/* This app has multiple modules
   import it here (the root module called app.module)
 */
var product_module_1 = require('./products/product.module');
//add the imported modules to the import array 
//including custom modules such as ProductModule
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                //other angular modules.
                //an angular module can be extended by importing capabilities from other angular modules
                //Note: the importing module cannot access modules that are imported by the module you are importing.
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
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
                //it cannot be declared in othe modules
                //all declared components, directives and pipes are private by default. we can share however
                //by exporting them
                app_component_1.AppComponent,
                welcome_component_1.WelcomeComponent
            ],
            bootstrap: [app_component_1.AppComponent] //bootstrap array defines the component that is the starting point of the application
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//an angular module exports @angular modules, 3rd party module, component, directive, pipes and even 
//other angular modules
//an angular module registers service providers with Angular injector making the service to any class 
//in the application 
//# sourceMappingURL=app.module.js.map