import { Component } from '@angular/core';
import { Employee } from '../models/employee.model' //file name
import {FormPoster} from '../services/form-poster.service'
import {NgForm} from '@angular/forms'

@Component({
  selector: 'gn-home',
  styleUrls: ['app/home/home.component.css'],
  templateUrl: 'app/home/home.component.html'
})

export class HomeComponent {
  languages = ["English", "Spanish", "Other"]
  model = new Employee('Chito', 'Tagayun', true, 'w2', 'default');
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster ){

  }

  firstNameToUpperCase(value: string) {
    if (value.length > 0)
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
      this.model.firstName = value;
  }

  submitForm(form: NgForm){
     //display data model in the console log
     //console.log(this.model);
     //console.log(form.value);
     

     //validate the select language
     this.validatePrimaryLanguage(this.model.primaryLanguage);
     if (this.hasPrimaryLanguageError)
        return;

     this.formPoster.postEmployeeForm(this.model);
  }
  validatePrimaryLanguage(value: string) {
    //console.log('lang:' + this.model.primaryLanguage);
    if (value === 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }
}

//This is the default route
