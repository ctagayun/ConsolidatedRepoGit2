import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

//this is a decorator that defines the AppModule  as an angular module
@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ], //declares AppComponent so that angular can find it's elector
  bootstrap: [ AppComponent ]   //declares AppComponent as the starting component of our application
})

//this is the class
export class AppModule { }
 

\