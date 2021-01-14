"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    //the ActivatedRouteSnapshot provides information about the about-to-be activated
    //route.
    //RouterStateSnapshot provides access to the entire router state.
    //checks if the user is currently logged in
    AuthGuard.prototype.canActivate = function (route, state) {
        console.log('In canActivate: ' + state.url);
        return this.checkLoggedIn(state.url);
    };
    //it calls the authorization service isLoggedIn method and returns true if the 
    //user is logged in. otherwise it redirets the to login page.
    //we call this method from canActivate() method
    AuthGuard.prototype.checkLoggedIn = function (url) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // Retain the attempted URL (In this case "Add Product")for redirection
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        //returning false cancelling the navigation to the requested route
        return false;
    };
    //Note: one of these two parameters must have the url that ws initially
    //selected. In our example the "Add Product" url
    //the RouterStateSnapshot will contain that url... ence the state.url
    //eing pass to checkLoggedIn(state.url);
    AuthGuard.prototype.canActivateChild = function (route, state) {
        console.log('In canActivateChild: ' + state.url);
        return this.checkLoggedIn(state.url);
    };
    AuthGuard.prototype.canLoad = function (route) {
        console.log('In canLoad: ' + route.path);
        return this.checkLoggedIn(route.path);
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//Note: since the auth-guard.serice is part of the user feature we will add it to the user.module.ts 
//# sourceMappingURL=auth-guard.service.js.map