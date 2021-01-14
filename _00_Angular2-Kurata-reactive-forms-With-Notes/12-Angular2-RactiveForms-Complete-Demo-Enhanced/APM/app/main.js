"use strict";
// main entry point of the application. This is the file that
//that bootstrap's our application. we use the dynamic bootstrapping and the "Just in Time" compiler.
//this that angular compiler compiles the application in the browser
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
//after compiling the angular launches the application starting with the root application in this
//"AppModule"
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//Note: angular can also precompile application - it is called AOT (Ahead of Time) compilation
//Example:
//import { platformBrowser} from '@angular/platform-browser';
//import { AppModule } from './app.module.ngfactory
//platformBrowser().bootstrapModuleFactory(AppModuleNgFactory); 
//# sourceMappingURL=main.js.map