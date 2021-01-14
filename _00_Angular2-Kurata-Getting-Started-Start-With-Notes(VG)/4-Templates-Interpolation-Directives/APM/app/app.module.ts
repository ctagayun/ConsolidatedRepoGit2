import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//BrowserModule exposes *ngIf and *ngFor

//need import statements for each component
import { AppComponent }  from './app.component';
import { ProductListComponent }  from './products/product-list.component';


//need to include in the declarations all the components we need. 
//In this case the AppComponent and ProductListComponent
@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


