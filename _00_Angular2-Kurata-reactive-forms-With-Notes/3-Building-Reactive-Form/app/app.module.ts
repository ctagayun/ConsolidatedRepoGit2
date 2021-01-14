import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; //need to import for ReactiveForms

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule //need to import  ReactiveForms
  ],
  declarations: [
    AppComponent,
    CustomerComponent  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
