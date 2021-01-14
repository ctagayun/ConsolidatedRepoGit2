//an angular module imports @angular modules, 3rd party module, component, directive, pipes and even 
//other angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; //needed by http data service
import { RouterModule } from '@angular/router';  //Step1 Routing: Registers the route service and declares the router directives,
                                                 //       exposes configured routes
import { AppComponent }  from './app.component';
import { WelcomeComponent } from './home/welcome.component';

/* This app has multiple modules
   import it here (the root module called app.module)
 */
import { ProductModule } from './products/product.module';

//add the imported modules to the import array 
//including custom modules such as ProductModule
@NgModule({
  imports: [       //this is the import array. 
    BrowserModule, //an angular module imports custom angular modules, 3rd party module, component, directive, pipes and even 
                   //other angular modules.
                   //an angular module can be extended by importing capabilities from other angular modules
                   //Note: the importing module cannot access modules that are imported by the module you are importing.
    HttpModule,
    RouterModule.forRoot([  //Step2 Routing: before we can navigate to a route, we need to ensure the route is available to the app by passing  
                            //an array of routes to the routing module like this. Note all the routes are inside an array
                            //if you want to use hash add this at the end of the array {useHash:true}
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }, //default route. requires pathMatch
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' } //denotes a wildcard path. executed if no match to any of the defined routes
    ]),

    ProductModule  //is a custom module defined in ./product folder
  ],
  declarations: [ //this is the declarations array.
                 //it declares each component, directive and pipe that it manages
                 //every component, directive and pipe we create must belong to one and only one module.
                 //it cannot be declared in othe modules
                 //all declared components, directives and pipes are private by default. we can share however
                 //by exporting them
    AppComponent,
    WelcomeComponent
  ],
  bootstrap: [ AppComponent ] //bootstrap array defines the component that is the starting point of the application
                              //the bootstrap array should only be used in the ROOT application module
                              
                              //an angular module bootstraps our "ROOT" application component. The root component
                              //is the component needed to display our first template
})
//a module is a class decorated with @NgModule
export class AppModule { }

//an angular module exports @angular modules, 3rd party module, component, directive, pipes and even 
//other angular modules

//an angular module registers service providers with Angular injector making the service to any class 
                   //in the application