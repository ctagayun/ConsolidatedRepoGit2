// main entry point
import { platformBrowserDynamic } 
   from '@angular/platform-browser-dynamic';

//import application module AppModule.js 
import { AppModule } 
    from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
