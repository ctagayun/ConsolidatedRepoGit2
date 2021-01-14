import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api.
//this api fakes the backend server. if your real backend server is setup
//remove this import statement
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ProductData }  from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import {ProductEditComponent} from './product-edit.component';

import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [    //this is the declarations array.
                 //it declares each component, directive and pipe that it manages
                 //every component, directive and pipe we create must belong to one and only one module.
                 //it cannot be re-declared in other modules.
                 //all declared components, directives and pipes are private by default. we can share however by exporting them.
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductFilterPipe
    ],
    imports: [  //this is the import array.
               //an angular module imports custom angular modules, 3rd party module, component, directive, pipes and even 
               //other angular modules
               //Note: the importing module cannot access modules that are imported by the module you are importing. 

               //The ProductData class provides the data managed by the in-memory-web-api
        SharedModule,
        ReactiveFormsModule, 
        InMemoryWebApiModule.forRoot(ProductData),
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            { path: 'product/:id',
              canActivate: [ ProductDetailGuard ], //be sure to add the guard to the route it is meant to guard
              component: ProductDetailComponent },
            { path: 'productEdit/:id',
              canDeactivate: [ ProductEditGuard ],
              component: ProductEditComponent },
        ])
    ],
    providers: [ //this the providers array
                 //any service provider added to the prviders array is registered
                 //at the root of the application. so the service is available to be injected into any class on the
                 //application.
                 //if you dont want the service provider to be available to other class inject it 
                 //in the component instead of using providers array
                 //there should only be one instance of the service. So don't add services to the providers array of a 
                 //shared module.
                 //Instead consider building a CoreModule for services and importing it once in the AppModule import array
                 //Routing guards must be added to the providers array of the Angular module
        ProductService,
        ProductDetailGuard,  //add the to the provider array because it is a service
        ProductEditGuard
    ]
})
export class ProductModule {}
