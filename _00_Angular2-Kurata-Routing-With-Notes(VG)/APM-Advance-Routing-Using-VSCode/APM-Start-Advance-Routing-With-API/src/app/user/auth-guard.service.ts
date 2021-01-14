import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route,
         CanActivate, CanActivateChild, CanLoad } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export  class AuthGuard implements CanActivate, CanActivateChild, CanLoad {


    constructor(private authService: AuthService,
                private router: Router) { }

    //the ActivatedRouteSnapshot provides information about the about-to-be activated
    //route.
    //RouterStateSnapshot provides access to the entire router state.
    //checks if the user is currently logged in

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('In canActivate: ' + state.url);
        return this.checkLoggedIn(state.url);
    }

     //it calls the authorization service isLoggedIn method and returns true if the 
    //user is logged in. otherwise it redirets the to login page.
    //we call this method from canActivate() method
    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        // Retain the attempted URL (In this case "Add Product")for redirection
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);

        //returning false cancelling the navigation to the requested route
        return false;
    }
    //Note: one of these two parameters must have the url that ws initially
    //selected. In our example the "Add Product" url
    //the RouterStateSnapshot will contain that url... ence the state.url
    //eing pass to checkLoggedIn(state.url);
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('In canActivateChild: ' + state.url);
        return this.checkLoggedIn(state.url);
    }

     //unlike the canActivate, the canLoad cannot access the ActivatedRouteSnapShot or 
     //ROuterStateSnapshop bcause the module defining the route is not loaded yet.
     //since we do not have access to ActivatedRouteSnapShot or ROuterStateSnapshop
     //we will obtain the url from route.path property
    canLoad(route: Route): boolean {
        console.log('In canLoad: ' + route.path);
        return this.checkLoggedIn(route.path);
    }

    
}

//Note: since the auth-guard.serice is part of the user feature we will add it to the user.module.ts