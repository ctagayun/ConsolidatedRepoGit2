import { NgModule } from '@angular/core';
//import { RouterModule, PreloadAllModules } from '@angular/router'; //no need for this because we are using custom 
                                                                     //custom SelectiveStrategy
import { RouterModule  } from '@angular/router';


import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',     //<---- this is parent path that was taken out of product.module.ts and moved here because of lazy loading stuff
                canActivate: [ AuthGuard ], // <-- from product.module.ts
                data: { preload: true }, // a flag. set the preload flag to true if you want to preload. preload property is used in selective-strategy.service.ts
                loadChildren: 'app/products/product.module#ProductModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },  //<--- this is from app/module.ts
            { path: '**', component: PageNotFoundComponent } //<--- this is from app/module.ts
        ], {enableTracing: true, preloadingStrategy: SelectiveStrategy }) // , { enableTracing: true })
    ],
    providers: [ SelectiveStrategy ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
