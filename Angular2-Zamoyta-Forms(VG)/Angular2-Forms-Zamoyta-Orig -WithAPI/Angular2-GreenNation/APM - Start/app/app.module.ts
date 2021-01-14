import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
//import { rootRouterConfig } from './app.routes';
//import { GithubService } from './github/shared/github.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';

//Importing my services
import { FormPoster }  from './services/form-poster.service';
import { ConfigService } from './api_settings/api-config.service';

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
  providers: [FormPoster, ConfigService],

  bootstrap: [ AppComponent ]
})

export class AppModule { }
