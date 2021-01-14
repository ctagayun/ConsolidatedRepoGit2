
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {Response, Headers, RequestOptions} from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';;

import {Employee} from "../models/employee.model";
import { ConfigService } from '../api_settings/api-config.service';

@Injectable()
export class FormPoster{

    private headers = new Headers({'Content-Type': 'application/json'});

    _baseUrl: string = '';
    
    constructor(private http: Http,  private configService: ConfigService){
       this._baseUrl = configService.getApiURI();
    }

     getLanguages(): Observable<any>{
       
        //todo is the web api controller name
          return this.http.get(this._baseUrl + 'todo')
                       .map(this.extractData )
                       .catch(this.handleError)  
     }

    //returns an observable
    postEmployeeForm(employee: Employee): Observable<any>{
        console.log('Server Posting employee record:', employee);
        let body = JSON.stringify(employee);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers})

        //returns and observable. So on our observable we'll then 
        //call .map. this is where we are going to extract the 
        //data that omes from the server.
        // if at any point there is an error .catch will get called
        return this.http.post('http://localhost:3100/postEmployee', body, options )
                        .map(this.extractLanguages )
                        .catch(this.handleError)  
    }
    
    //it will be passed  a Response object
    private extractData(res:Response){
        //what we need to do is to call res.json and that will get us the 
        //body from the response
        let body = res.json();

        //.fields is were the server put all the posted fields
        // || {} means that if for some reason .fields is null we'll just return an empty object
        //Note: all fields of the record are stores in body.data
        return body.data || {};
    }

    //it will be passed  a Response object
    private extractLanguages(res:Response){
        console.log('Response= ', res);
        //what we need to do is to call res.json and that will get us the 
        //body from the response
        let body = res.json();

        //.fields is were the server put all the posted fields
        // || {} means that if for some reason .fields is null we'll just return an empty object
        return body.fields || {};
    }
    
     private handleError(error:any){
         console.log('Error= ', error.statusText);
       console.error('post error: ', error);
       return Observable.throw(error.statusText);
    }
}