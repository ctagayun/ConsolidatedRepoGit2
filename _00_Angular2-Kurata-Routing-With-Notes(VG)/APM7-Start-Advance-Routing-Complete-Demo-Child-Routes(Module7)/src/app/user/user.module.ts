import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'; //  again import router module  

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

import { SharedModule } from '../shared/shared.module';


//again after importing the router module define the RouterModule.forChild([  
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
    AuthService
  ]
})
export class UserModule { }
