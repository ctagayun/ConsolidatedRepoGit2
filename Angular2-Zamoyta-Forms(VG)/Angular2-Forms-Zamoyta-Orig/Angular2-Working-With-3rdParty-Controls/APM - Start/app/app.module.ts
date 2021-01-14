import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
//import { rootRouterConfig } from './app.routes';
//import { GithubService } from './github/shared/github.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
 import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RatingModule, ButtonsModule, TimepickerModule, DatepickerModule
  ],
  declarations: [ AppComponent,
                  HomeComponent
                  ],
 
  bootstrap: [ AppComponent ]
})

export class AppModule { }
