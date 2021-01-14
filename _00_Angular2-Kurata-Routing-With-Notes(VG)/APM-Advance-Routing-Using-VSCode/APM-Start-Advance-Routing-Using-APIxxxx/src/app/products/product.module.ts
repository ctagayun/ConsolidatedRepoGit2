import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'; //import routermodule

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service'; 
import { ProductResolver } from './product-resolver.service';  //import the Resolver
import { ProductEditGuard } from './product-guard.service';

import { SharedModule } from '../shared/shared.module'; //this module is importing a shared module

import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';

import { AuthGuard } from '../user/auth-guard.service'; //add import statement for the guard
                                                        //then we can attach canActivate to the desired toute defined below
import { ConfigService } from '../api_settings/api-config.service';

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

//Grouping and component-less Routes. This means that the Product-Edit.Component will not 
//have a [router-outlet] so the ProductEditInfoComponent, ProductEditTagsComponent as
//well as ProductDetailComponent will be displayed in the <router-outlet></router-outlet>
//defined in app.component.html

//To group routes:
  // - define routes as children of onr parent Route
  // - specify relative Paths
  // But grouping alone is not sufficient because the router 
  //wants to out these child-routes into a touter-outlet in the parent component's
  //template.
  // To define a component-less route:
  //  - add a default path that routes to the desired component
  //  - remove the component from the parent route making it component-less route
  //  - the child routes are displayed in a higher-level outlet
  //  Component-less routes allows lazy loading and sharing of resolver.

  //after adding import statement for AuthGuard above, 
  //then we can attach canActivate to the desired route defined below.
  //we could add the authGuard to each prodct routes or we could just add the
  //canActivate guard to the parent route like this:  canActivate: [AuthGuard],
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      //{
       // path: 'products',    <--- remove this parent path and move it to app-routing.module.ts
       // canActivate: [AuthGuard],
       // children: [
          {
            path: '',
            component: ProductListComponent
          },
          {
            path: ':id',
            component: ProductDetailComponent,
            resolve:{product: ProductResolver}
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            canDeactivate: [ProductEditGuard],
            resolve:{product: ProductResolver},
            children:[
               {path: '', redirectTo: 'info', pathMatch: 'full'},
               {path: 'info', component: ProductEditInfoComponent},
               {path: 'tags', component: ProductEditTagsComponent},
             ]
          }
       // ]
     // }
   
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
    ProductResolver,
    ProductEditGuard
   // ConfigService
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

  //   This is the child routes configuration without grouping
  //    RouterModule.forChild([
  //     {path: 'products', component: ProductListComponent},
  //     {
  //       path: 'products/:id', 
  //       component: ProductDetailComponent,
  //       resolve:{product: ProductResolver}
  //      },
  //     {
  //       path: 'products/:id/edit',
  //       component: ProductEditComponent,
  //       resolve:{product: ProductResolver},
  //       children: [
  //         {
  //           path: '',
  //           redirectTo: 'info',
  //           pathMatch: 'full'
  //         },
  //         {
  //           path: 'info',
  //           component: ProductEditInfoComponent
  //         },
  //         {
  //           path: 'tags',
  //           component: ProductEditTagsComponent
  //         }
  //       ]
  //   }
  //   ])
  // ],