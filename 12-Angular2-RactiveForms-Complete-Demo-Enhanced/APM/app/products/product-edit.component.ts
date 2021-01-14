import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

//ActivatedRoute is needed to read the parameter of the selected records.
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IProduct } from './product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator'; //import validators we need
import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './app/products/product-edit.component.html'
})

export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Product Edit';
    errorMessage: string;
    productForm: FormGroup;  //create a form gropu

    product: IProduct;       //create instance of data model IProduct
    private sub: Subscription; //create a variable of type "Subscription"

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }
    //instantiate FormBuilder in our constructor only if you are going to use FormBuilder to
    //create an instance of FormGroup
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,  //inject it here because it is a service
                private router: Router,
                private productService: ProductService) {

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
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
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

        //another way of creating an instance of the FormGroup by using FormBuilder
        //shows several ways of initializing it
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });

        //First read the product Id from the route parameter. Set it up in the init lifecycle hook.

        //There are 2 ways two read a parameter, one is to use observable
        //like the following. Everytime the parameter changes, this code get notified, the id
        //is pulled from the provided parameter array, and the code calls
        //getProduct to get product data for this id
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id']; //first get productid from the route
                this.getProduct(id);    //then call getProduct(id) below
            }
        );
        
        //the other way is to use snapshot like this
        // this.sub = this.route.params.subscribe(
        //     params => {
        //         let id= +params['id'];
        //     }
        // )
    }

    //to ensure the subscription is appropriately cleaned up, call the ngOnDestroy to unsubscribe...but
    //to unsubscribe from an observable, we need to have the subscription "this.sub" captured above... like this
    //  this.sub = this.route.params.subscribe(
    //     params => {
    //         let id = +params['id'];
    //         this.getProduct(id);
    //     }
    //  );
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.productForm);
        });
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    
    getProduct(id: number): void {
        this.productService.getProduct(id)  //call getProduct(id) method in product.service.ts
            .subscribe(                     //we subscribe to the returned observable providing 2 call back functions
                (product: IProduct) => this.onProductRetrieved(product), //execute this callback if successfull
                (error: any) => this.errorMessage = <any>error           //execute this if there's an error
            );
    }

    onProductRetrieved(product: IProduct): void {
        if (this.productForm) {
            this.productForm.reset(); //if the form is already in use reset it. This ensures that all state flags 
                                      //such as dirty, touched and so on are cleared before displaying the retrieved data. 
        }

        this.product = product;  //populate instance of our data model IProduct. Recall we are not using data binding
                                 //on the product, so this does not update the form with data

        if (this.product.id === 0) {   //next reset title on the page
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
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
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    //see ngSubmit in product-edit.component.html
    saveProduct(): void {
        //first check if the form has changed. There is not point saving the data if nothing changed
        if (this.productForm.dirty && this.productForm.valid) {
            // Copy the form values over the product object values
            //Here we create a new this.product object from the product data model property using the values 
            //from this.productForm.value overwriting any values
            let p = Object.assign({}, this.product, this.productForm.value);

            this.productService.saveProduct(p) //call saveProduct() method in product.service.ts
                .subscribe(                    //we need to subscribe so that the saveProduct() method will get executed
                    () => this.onSaveComplete(), //call onSaveComplete() defined below
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.productForm.dirty) { //If not dirty or nothing changed, clicking the save button 
                                              //simply calls the onSaveComplete() method defined below
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
    }
}
