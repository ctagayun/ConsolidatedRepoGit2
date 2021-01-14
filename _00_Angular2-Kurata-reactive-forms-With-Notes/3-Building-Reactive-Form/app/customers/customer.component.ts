import { Component, OnInit } from '@angular/core';       //needed to implement OnInit method
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'; //first import our building blocks

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit  {
    customerForm: FormGroup;  //second create an instance of FormGroup. This root FormGroup
                              //defines our form model
    customer: Customer= new Customer(); //instantiate the data model to be passed to and from the server

    //instantiate FormBuilder in our constructor only if you are going to use FormBuilder to
    //create an instance of FormGroup
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        //in this method we create an instance of FormGroup class, in this case customerForm
        //  this.customerForm = new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     email: new FormControl(),
        //     sendCatalog: new FormControl(true)
        //  });

        //another way of creating an instance of the FormGroup by using FormBuilder
        //shows several ways of initializing i
         this.customerForm = this.fb.group({
             firstName: [{value: 'Chito', disabled: false}],
             lastName: [''],
             email: '',
             sendCatalog: [{value:true, disabled: false}]
        });
    }

    //use setValue() or patchValue() to set the value of evert FormControl
    //use patchValue() if updating only part of the form otherwise use seValue()
    populateTestData(): void {
        this.customerForm.patchValue({
            firstName: 'Chito',
            lastName: 'Tagayun',
            sendCatalog: false
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
 }
