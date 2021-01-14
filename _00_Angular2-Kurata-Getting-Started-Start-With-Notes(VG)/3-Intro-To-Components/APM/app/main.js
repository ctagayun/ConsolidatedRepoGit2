"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main entry point
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
//here we tell Angular module loader where to find our Angular application module
var app_module_1 = require("./app.module");
//then we call platformBrowserDynamic() function to load our AppModule
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map