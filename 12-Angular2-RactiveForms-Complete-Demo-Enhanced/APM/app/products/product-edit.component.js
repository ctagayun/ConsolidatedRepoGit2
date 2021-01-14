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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
//ActivatedRoute is needed to read the parameter of the selected records.
var router_1 = require('@angular/router');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/merge');
var Observable_1 = require('rxjs/Observable');
var product_service_1 = require('./product.service');
var number_validator_1 = require('../shared/number.validator'); //import validators we need
var generic_validator_1 = require('../shared/generic-validator');
var ProductEditComponent = (function () {
    //instantiate FormBuilder in our constructor only if you are going to use FormBuilder to
    //create an instance of FormGroup
    function ProductEditComponent(fb, route, //inject it here because it is a service
        router, productService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.pageTitle = 'Product Edit';
        // Use with the generic validation message class
        this.displayMessage = {};
        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    Object.defineProperty(ProductEditComponent.prototype, "tags", {
        get: function () {
            return this.productForm.get('tags');
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        //(see building ReactiveForm Demo)
        //in this method we create an instance of FormGroup class, in this case customerForm
        //  this.customerForm = new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     email: new FormControl(),
        //     sendCatalog: new FormControl(true)
        //  });
        //(see building ReactiveForm Demo)
        //another way of creating an instance of the FormGroup by using FormBuilder
        //shows several ways of initializing i
        //  this.customerForm = this.fb.group({
        //      firstName: [{value: 'Chito', disabled: false}],
        //      lastName: [''],
        //      email: '',
        //      sendCatalog: [{value:true, disabled: false}]
        // });
        var _this = this;
        //another way of creating an instance of the FormGroup by using FormBuilder
        //shows several ways of initializing it
        this.productForm = this.fb.group({
            productName: ['', [forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)]],
            productCode: ['', forms_1.Validators.required],
            starRating: ['', number_validator_1.NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });
        //First read the product Id from the route parameter. Set it up in the init lifecycle hook.
        //There are 2 ways two read a parameter, one is to use observable
        //like the following. Everytime the parameter changes, this code get notified, the id
        //is pulled from the provided parameter array, and the code calls
        //getProduct to get product data for this id
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id']; //first get productid from the route
            _this.getProduct(id); //then call getProduct(id) below
        });
        //the other way is to use snapshot like this
        // this.sub = this.route.params.subscribe(
        //     params => {
        //         let id= +params['id'];
        //     }
        // )
    };
    //to ensure the subscription is appropriately cleaned up, call the ngOnDestroy to unsubscribe...but
    //to unsubscribe from an observable, we need to have the subscription "this.sub" captured above... like this
    //  this.sub = this.route.params.subscribe(
    //     params => {
    //         let id = +params['id'];
    //         this.getProduct(id);
    //     }
    //  );
    ProductEditComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Watch for the blur event from any input element on the form.
        var controlBlurs = this.formInputElements
            .map(function (formControl) { return Observable_1.Observable.fromEvent(formControl.nativeElement, 'blur'); });
        // Merge the blur event observable with the valueChanges observable
        Observable_1.Observable.merge.apply(Observable_1.Observable, [this.productForm.valueChanges].concat(controlBlurs)).debounceTime(800).subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.productForm);
        });
    };
    ProductEditComponent.prototype.addTag = function () {
        this.tags.push(new forms_1.FormControl());
    };
    ProductEditComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.productService.getProduct(id) //call getProduct(id) method in product.service.ts
            .subscribe(//we subscribe to the returned observable providing 2 call back functions
        function (product) { return _this.onProductRetrieved(product); }, //execute this callback if successfull
        function (error) { return _this.errorMessage = error; } //execute this if there's an error
        );
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        if (this.productForm) {
            this.productForm.reset(); //if the form is already in use reset it. This ensures that all state flags 
        }
        this.product = product; //populate instance of our data model IProduct. Recall we are not using data binding
        //on the product, so this does not update the form with data
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.productName;
        }
        //now using the the product properties (our data model) set the value of each FormControls on the form
        //use setValue() or patchValue() to set the value of each FormControl
        //use patchValue() if updating only part of the form otherwise use setValue()
        //We use patchValue here and not setValue, so we can set the values for a \
        //subset of the FormControls on the form (which in this case is the formArray). We 
        //cannot set the value of the FormArray with SetValue
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });
        //use setControl to reset the FormArray to the set of product tags
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    };
    ProductEditComponent.prototype.deleteProduct = function () {
        var _this = this;
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
        else {
            if (confirm("Really delete the product: " + this.product.productName + "?")) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(function () { return _this.onSaveComplete(); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    //see ngSubmit in product-edit.component.html
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        //first check if the form has changed. There is not point saving the data if nothing changed
        if (this.productForm.dirty && this.productForm.valid) {
            // Copy the form values over the product object values
            //Here we create a new this.product object from the product data model property using the values 
            //from this.productForm.value overwriting any values
            var p = Object.assign({}, this.product, this.productForm.value);
            this.productService.saveProduct(p) //call saveProduct() method in product.service.ts
                .subscribe(//we need to subscribe so that the saveProduct() method will get executed
            function () { return _this.onSaveComplete(); }, //call onSaveComplete() defined below
            function (error) { return _this.errorMessage = error; });
        }
        else if (!this.productForm.dirty) {
            //simply calls the onSaveComplete() method defined below
            this.onSaveComplete();
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
    };
    __decorate([
        core_1.ViewChildren(forms_1.FormControlName, { read: core_1.ElementRef }), 
        __metadata('design:type', Array)
    ], ProductEditComponent.prototype, "formInputElements", void 0);
    ProductEditComponent = __decorate([
        core_1.Component({
            templateUrl: './app/products/product-edit.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService])
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map