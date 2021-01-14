"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_list_component_1 = require("./product-list.component");
var product_detail_component_1 = require("./product-detail.component");
var product_filter_pipe_1 = require("./product-filter.pipe");
var product_guard_service_1 = require("./product-guard.service"); //must be imported at the app.module level
var product_service_1 = require("./product.service");
var shared_module_1 = require("../shared/shared.module");
var ProductModule = (function () {
    //THIS IS CALLED FEATURE MODULE - used for grouping components that shares related
    //functionalities - such as product related components, services, directives and pipes 
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    core_1.NgModule({
        declarations: [
            //it declares each component, directive and pipe that it manages
            //every component, directive and pipe we create must belong to one and only one module.
            //it cannot be re-declared in other modules.
            //all declared components, directives and pipes are private by default. we can share however by exporting them.
            product_list_component_1.ProductListComponent,
            product_detail_component_1.ProductDetailComponent,
            product_filter_pipe_1.ProductFilterPipe
        ],
        imports: [
            //an angular module imports custom angular modules, 3rd party module, component, directive, pipes and even 
            //other angular modules
            //Note: the importing module cannot access modules that are imported by the module you are importing. 
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild([
                { path: 'products', component: product_list_component_1.ProductListComponent },
                { path: 'product/:id',
                    canActivate: [product_guard_service_1.ProductDetailGuard],
                    component: product_detail_component_1.ProductDetailComponent },
            ])
        ],
        providers: [
            //any service provider added to the providers array OF THE APP.MODULE is registered
            //at the root of the application. so the service is available to be
            // injected into any class on the application. 
            //if you dont want the service provider to be available to other class 
            //inject it in the component's providers ARRAY instead of  providers array
            //of the module.
            //there should only be one instance of the service. So don't add services to the providers array of a 
            //shared module.
            //Instead consider building a CoreModule for services and importing it once in the AppModule import array
            //Routing guards must be added to the providers array of the Angular module
            product_service_1.ProductService,
            product_guard_service_1.ProductDetailGuard //add the to the provider array because it is a service
        ]
    })
    //THIS IS CALLED FEATURE MODULE - used for grouping components that shares related
    //functionalities - such as product related components, services, directives and pipes 
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map