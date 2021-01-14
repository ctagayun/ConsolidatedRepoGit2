"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router"); //import routermodule
var product_list_component_1 = require("./product-list.component");
var product_detail_component_1 = require("./product-detail.component");
var product_edit_component_1 = require("./product-edit.component");
var product_filter_pipe_1 = require("./product-filter.pipe");
var product_service_1 = require("./product.service");
var product_resolver_service_1 = require("./product-resolver.service"); //import the Resolver
var shared_module_1 = require("../shared/shared.module"); //this module is importing a shared module
var product_edit_info_component_1 = require("./product-edit-info.component");
var product_edit_tags_component_1 = require("./product-edit-tags.component");
//import { ProductEditGuard } from './product-guard.service';
//the components in the  declaration module manages all of the product components and a filter pipe
//this module provides a product data service to encapsulate the communication with the backend
//server to get and post data
//again remember we are using Router.forchild because we are defining a route for a feature
//after defining RouterModule.forChild( we need an action to activate this route. go to app.component.html and setup
//the necessary routerlink directive
//Note: we can also activate a route programmatically - see app.component.ts
//Note Route Path Naming  Strategies:
// products = products
//product/:id = products/:id
//productedit:id = products/:id/edit
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild([
                { path: 'products', component: product_list_component_1.ProductListComponent },
                {
                    path: 'products/:id',
                    component: product_detail_component_1.ProductDetailComponent,
                    resolve: { product: product_resolver_service_1.ProductResolver }
                },
                {
                    path: 'products/:id/edit',
                    component: product_edit_component_1.ProductEditComponent,
                    resolve: { product: product_resolver_service_1.ProductResolver },
                    children: [
                        {
                            path: '',
                            redirectTo: 'info',
                            pathMatch: 'full'
                        },
                        {
                            path: 'info',
                            component: product_edit_info_component_1.ProductEditInfoComponent
                        },
                        {
                            path: 'tags',
                            component: product_edit_tags_component_1.ProductEditTagsComponent
                        }
                    ]
                }
            ])
        ],
        declarations: [
            product_list_component_1.ProductListComponent,
            product_detail_component_1.ProductDetailComponent,
            product_edit_component_1.ProductEditComponent,
            product_filter_pipe_1.ProductFilterPipe,
            product_edit_info_component_1.ProductEditInfoComponent,
            product_edit_tags_component_1.ProductEditTagsComponent
        ],
        providers: [
            product_service_1.ProductService,
            product_resolver_service_1.ProductResolver
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//Note: above we will add routes for each tab as children of the edit route like this:
//  {
//     path: 'products/:id/edit',
//     component: ProductEditComponent,
//     resolve:{product: ProductResolver}
//
//     children: [   -- add children array
//       {
//         path: '',      -- this first path is for an empty path. this defines the default path to display if no chicld path has been specified
//         redirectTo: 'info',
//         pathMatch: 'full'
//       },
//       {
//         path: 'info',
//         component: ProductEditInfoComponent
//       },
//       {
//         path: 'tags',
//         component: ProductEditTagsComponent
//       }
//     ]
// }
//Note remember we must have a router link directive within the product-edit.component.html 
//# sourceMappingURL=product.module.js.map