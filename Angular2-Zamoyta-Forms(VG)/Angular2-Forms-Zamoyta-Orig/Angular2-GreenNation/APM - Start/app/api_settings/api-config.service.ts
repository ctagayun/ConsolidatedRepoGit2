import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    
    _apiURI : string;

    constructor() {
        //This should be changed according to API Url.
        //this._apiURI = 'http://localhost:62094/api/';
         this._apiURI = 'http://localhost:13743/api/';
     }

     getApiURI() {
         return this._apiURI;
     }

     getApiHost() {
         return this._apiURI.replace('api/','');
     }
}