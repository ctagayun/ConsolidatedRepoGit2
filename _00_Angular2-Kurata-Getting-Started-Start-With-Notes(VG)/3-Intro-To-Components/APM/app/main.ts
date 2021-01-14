// main entry point
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//here we tell Angular module loader where to find our Angular application module
import { AppModule } from './app.module';

//then we call platformBrowserDynamic() function to load our AppModule
platformBrowserDynamic().bootstrapModule(AppModule);
