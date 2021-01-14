
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Employee} from "../models/employee.model";

@Injectable()
export class FormPoster

{
    constructor(private http: Http){

    }

    postEmployeeForm(employee: Employee){
        console.log('Posting employee record:', employee);
    }
}