"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core'); //needed to implement OnInit method
var forms_1 = require('@angular/forms'); //first import our building blocks
var customer_1 = require('./customer');
var CustomerComponent = (function () {
    //instantiate FormBuilder in our constructor only if you are going to use FormBuilder to
    //create an instance of FormGroup
    function CustomerComponent(fb) {
        this.fb = fb;
        //defines our form model
        this.customer = new customer_1.Customer(); //instantiate the data model to be passed to and from the server
    }
    CustomerComponent.prototype.ngOnInit = function () {
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
            firstName: [{ value: 'Chito', disabled: false }],
            lastName: [''],
            email: '',
            sendCatalog: [{ value: true, disabled: false }]
        });
    };
    //use setValue() or patchValue() to set the value of evert FormControl
    //use patchValue() if updating only part of the form otherwise use seValue()
    CustomerComponent.prototype.populateTestData = function () {
        this.customerForm.patchValue({
            firstName: 'Chito',
            lastName: 'Tagayun',
            sendCatalog: false
        });
    };
    CustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'my-signup',
            templateUrl: './app/customers/customer.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map