import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'; //import routermodule

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service'; 
import { ProductResolver } from './product-resolver.service';  //import the Resolver

import { SharedModule } from '../shared/shared.module'; //this module is importing a shared module

import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
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


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id', 
        component: ProductDetailComponent,
        resolve:{product: ProductResolver}
       },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        resolve:{product: ProductResolver},
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: ProductEditInfoComponent
          },
          {
            path: 'tags',
            component: ProductEditTagsComponent
          }
        ]
    }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}

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