import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import { Customer } from './customer';

function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
      return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
 }

function ratingRange(min: number, max: number): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        };
        return null;
    };
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit  {
    customerForm: FormGroup;
    customer: Customer= new Customer();
    emailMessage: string;

    //this method will contain a list of all available validation messages
    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.',
        minlength: 'Please enter at least 4 characters.'
    };

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
                            Validators.minLength(4)]],
                confirmEmail: ['', Validators.required],
            }, {validator: emailMatcher}),
            phone: '',
            notification: 'email',
            rating: ['', ratingRange(1, 5)],
            sendCatalog: true
        });

        //Example of using a watcher: this.customerForm.get('notification').valueChanges
        //notification is a formControlName. see customer.component.html
        //no need to bind the formControlName "notification" to a click event
        //but need to subscribe like this:  .subscribe(value => this.setNotification(value));
        //this.setNotication() method is called
        this.customerForm.get('notification').valueChanges
                         .subscribe(value => this.setNotification(value));

        //Another watcher for emailGroup.email
        //first define a variable that will contain a reference to email FormControl
        const emailControl = this.customerForm.get('emailGroup.email');
        //to minimize repeated code we add a watcher for the FormControl.
        emailControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(emailControl)); //this is the watcher callback function
    }

    populateTestData(): void {
        this.customerForm.patchValue({
            firstName: 'Jack',
            lastName: 'Harkness',
            sendCatalog: false
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        //the following code is a replacement to the following validation code in the custoner.component.html:
                 //*ngIf="(customerForm.get('emailGroup.email').touched ||
                 //customerForm.get('emailGroup.email').dirty) &&
                 // customerForm.get('emailGroup.email').errors">
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
                 
        }
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
 }
