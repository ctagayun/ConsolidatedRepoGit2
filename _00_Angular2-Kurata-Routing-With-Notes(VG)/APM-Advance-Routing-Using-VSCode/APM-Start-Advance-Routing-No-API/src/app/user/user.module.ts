import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'; // Step1 -  CONFIGURE feature module by importing router module again

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import  {AuthGuard } from './auth-guard.service';

import { SharedModule } from '../shared/shared.module';

//Step 2 for configuring feature module
//again after importing the router module define the RouterModule.forChild
//and specify the path.

//Step 3:
//go to app.component.html to activate the login route
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([                    
      {path: 'login', component: LoginComponent}
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class UserModule { }
