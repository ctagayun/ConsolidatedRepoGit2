import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';

@NgModule({
  imports: [
    BrowserModule, //contains basic directives as NgIf, NgFor
    BrowserAnimationsModule,
    HttpClientModule, 
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    UserModule, //feature module - defined in user folder along with its associated components
                //and services
    MessageModule, //feature module
    AppRoutingModule //feature module
  ],
  declarations: [ //declares components that has access to imported modules
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
