// main entry point of the application. This is the file that
//that bootstrap's our application. we use the dynamic bootstrapping and the "Just in Time" compiler.
//this that angular compiler compiles the application in the browser
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

//after compiling the angular launches the application starting with the root application in this
//"AppModule"
platformBrowserDynamic().bootstrapModule(AppModule);


//Note: angular can also precompile application - it is called AOT (Ahead of Time) compilation
//Example:
//import { platformBrowser} from '@angular/platform-browser';
//import { AppModule } from './app.module.ngfactory
//platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);