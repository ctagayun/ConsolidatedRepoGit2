import { NgModule } from '@angular/core';

//*ngIf and *ngForare part of BrowserModule so we import it here
import { BrowserModule } from '@angular/platform-browser';

//we need FormsModule if we use ngModel directive
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ProductListComponent }  from './products/product-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
