import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductDetailGuard } from './product-guard.service';  //must be imported at the app.module level
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
        ProductFilterPipe
    ],
    imports: [  //this is the import array.
               //an angular module imports custom angular modules, 3rd party module, component, directive, pipes and even 
               //other angular modules
               //Note: the importing module cannot access modules that are imported by the module you are importing. 
        SharedModule,
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            { path: 'product/:id',
              canActivate: [ ProductDetailGuard ], //be sure to add the guard to the route it is meant to guard
              component: ProductDetailComponent },
        ])
    ],
    providers: [ //PROVIDERS ARRAY:   
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
        ProductService,
        ProductDetailGuard  //add the to the provider array because it is a service
    ]
})

//THIS IS CALLED FEATURE MODULE - used for grouping components that shares related
//functionalities - such as product related components, services, directives and pipes 
export class ProductModule {}
