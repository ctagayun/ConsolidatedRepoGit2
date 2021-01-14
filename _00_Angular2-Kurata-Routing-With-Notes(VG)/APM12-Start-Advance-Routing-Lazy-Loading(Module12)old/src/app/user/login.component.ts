import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './app/user/login.component.html'
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';

     
    //inject the imported router module here because we are routing programmatically
    constructor(private authService: AuthService,
                private router: Router) { }
    //
    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this.authService.login(userName, password);

            // Navigate to the Product List page after log in.
            //The .redirectUrl is the data being shared
              if (this.authService.redirectUrl) {
                 this.router.navigateByUrl(this.authService.redirectUrl);
             } else {
                this.router.navigate(['/products']); //navigate to productlistcomponent once successfully logged in
             }
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        };
    }
}
