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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
// Imports for loading & configuring the in-memory web api.
//this api fakes the backend server. if your real backend server is setup
//remove this import statement
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var product_data_1 = require('./product-data');
var product_list_component_1 = require('./product-list.component');
var product_detail_component_1 = require('./product-detail.component');
var product_filter_pipe_1 = require('./product-filter.pipe');
var product_guard_service_1 = require('./product-guard.service');
var product_edit_component_1 = require('./product-edit.component');
var product_service_1 = require('./product.service');
var shared_module_1 = require('../shared/shared.module');
var ProductModule = (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        core_1.NgModule({
            declarations: [
                //it declares each component, directive and pipe that it manages
                //every component, directive and pipe we create must belong to one and only one module.
                //it cannot be re-declared in other modules.
                //all declared components, directives and pipes are private by default. we can share however by exporting them.
                product_list_component_1.ProductListComponent,
                product_detail_component_1.ProductDetailComponent,
                product_edit_component_1.ProductEditComponent,
                product_filter_pipe_1.ProductFilterPipe
            ],
            imports: [
                //an angular module imports custom angular modules, 3rd party module, component, directive, pipes and even 
                //other angular modules
                //Note: the importing module cannot access modules that are imported by the module you are importing. 
                //The ProductData class provides the data managed by the in-memory-web-api
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(product_data_1.ProductData),
                router_1.RouterModule.forChild([
                    { path: 'products', component: product_list_component_1.ProductListComponent },
                    { path: 'product/:id',
                        canActivate: [product_guard_service_1.ProductDetailGuard],
                        component: product_detail_component_1.ProductDetailComponent },
                    { path: 'productEdit/:id',
                        canDeactivate: [product_guard_service_1.ProductEditGuard],
                        component: product_edit_component_1.ProductEditComponent },
                ])
            ],
            providers: [
                //any service provider added to the prviders array is registered
                //at the root of the application. so the service is available to be injected into any class on the
                //application.
                //if you dont want the service provider to be available to other class inject it 
                //in the component instead of using providers array
                //there should only be one instance of the service. So don't add services to the providers array of a 
                //shared module.
                //Instead consider building a CoreModule for services and importing it once in the AppModule import array
                //Routing guards must be added to the providers array of the Angular module
                product_service_1.ProductService,
                product_guard_service_1.ProductDetailGuard,
                product_guard_service_1.ProductEditGuard
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ProductModule);
    return ProductModule;
}());
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map