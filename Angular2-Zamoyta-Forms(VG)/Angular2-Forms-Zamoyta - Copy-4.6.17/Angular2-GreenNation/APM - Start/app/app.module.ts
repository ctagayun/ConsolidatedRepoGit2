import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
//import { rootRouterConfig } from './app.routes';
//import { GithubService } from './github/shared/github.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { FormPoster }  from './services/form-poster.service';

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  declarations: [ AppComponent,
                  HomeComponent
                  ],
  providers: [FormPoster],

  bootstrap: [ AppComponent ]
})

export class AppModule { }
