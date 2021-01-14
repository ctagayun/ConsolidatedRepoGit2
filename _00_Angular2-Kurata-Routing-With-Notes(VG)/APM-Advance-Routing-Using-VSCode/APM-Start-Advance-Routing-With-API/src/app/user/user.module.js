"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router"); // Step1 -  CONFIGURE feature module by importing router module again
var login_component_1 = require("./login.component");
var auth_service_1 = require("./auth.service");
var auth_guard_service_1 = require("./auth-guard.service");
var shared_module_1 = require("../shared/shared.module");
//Step 2 for configuring feature module
//again after importing the router module define the RouterModule.forChild
//and specify the path.
//Step 3:
//go to app.component.html to activate the login route
var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild([
                { path: 'login', component: login_component_1.LoginComponent }
            ])
        ],
        declarations: [
            login_component_1.LoginComponent
        ],
        providers: [
            auth_service_1.AuthService,
            auth_guard_service_1.AuthGuard
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map