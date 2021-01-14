import { NgModule } from '@angular/core';

//importing the angular router module. Provides configuration services
//and 3 directives for activating and displaying our routes
//  RouterLink (provides clickable link), 
//  RouterLinkActive (active link), 
//  RouterOutlet (where the active clicked component is displayed) 

import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

//Angular RouterModule provides 2 methods for configuring our routes: 
//RouterModule.forRoot() - manages our route configuration an registers router service
//                         used only once in the app
//RouterModule.forChild() - 
@NgModule({
  imports: [
    RouterModule.forRoot([ //creates a module that contains all directives,
                          //given routes (path) and the router service itself
                          //calling this method registers the router to the whole application 
      { path: 'welcome', component: WelcomeComponent }, //default route
      {
        path: 'products',
        canActivate: [ AuthGuard ],
        data: { preload: true },
        loadChildren: './products/product.module#ProductModule'
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }, //redirects to welcome default route on entry 
      { path: '**', component: PageNotFoundComponent }
    ], { enableTracing: true, preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
