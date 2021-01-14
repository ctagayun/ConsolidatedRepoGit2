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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var message_service_1 = require("../messages/message.service");
var product_service_1 = require("./product.service");
var ProductEditComponent = (function () {
    function ProductEditComponent(productService, messageService, route, router) {
        this.productService = productService;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
        this.pageTitle = 'Product Edit';
        // to do manaul validation we need some type of data structure to hold validation
        // state of each tab. since we can have any number of tabs let's define a property
        //and set its type is a set of key-value pairs where the key is the "tabpath name and the 
        //value is true or false."  
        this.dataIsValid = {};
    }
    //Note: Very Important! If the parameter of the URL is the only that changed,
    //the component is not initialized again. Becaue the NgInit is not execurted again because only
    //the parameter changed, not the URL
    //But how do we watch changes in parameters... we use observable. But how do we do that? Luckily
    //ActivatedRoute exposes "route params"
    ProductEditComponent.prototype.ngOnInit = function () {
        //we will comment this out instead we will access the ActivatedRoute service params observable
        //let id = +this.route.snapshot.params["id"];           
        //this.getProduct(id);  
        var _this = this;
        //let's coomment this out. we will use the data resolver.
        //accessing ActivatedRoute service params observable
        //this will be executed everytime the parameter changes
        //this.getProduct(id) will rturn an initialized product object if id=0 (see getProduct) 
        // this.route.params.subscribe(params => {             
        //   let id = +params["id"];           
        //   this.getProduct(id); 
        // });
        //here we are unsing the resolver and pass the product data to the onProductRetrieve() method
        // this.onProductRetrieved(this.route.snapshot.data['product']);
        // better code. comment out the above.  here we Watch for changes to the resolve data
        //so that if we are adding a new product, the data will be reinitialized
        //Note: we are only notified of the changes when the resolver re-fetches the data.
        //we won't receive notification if our code changes that data. for example,
        //if we are on preductEdit page and the user selects "Add Product", we will 
        //get a notification when the reolver fetches the initialized product. if we modify one of the product 
        //properties such as changing the product name, we will not get a notification.
        this.route.data.subscribe(function (data) {
            _this.onProductRetrieved(data['product']);
        });
    };
    //    getProduct(id: number): void {
    //     this.productService.getProduct(id)
    //         .subscribe(
    //             (product: IProduct) => this.onProductRetrieved(product),
    //             (error: any) => this.errorMessage = <any>error
    //         );
    // }
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        this.product = product;
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = "Edit Product: " + this.product.productName;
        }
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
                    .subscribe(function () { return _this.onSaveComplete(_this.product.productName + " was deleted"); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    //when save button is click, call isValid(null) method passing in null
    //to mean check all tabs
    ProductEditComponent.prototype.saveProduct = function () {
        var _this = this;
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(function () { return _this.onSaveComplete(_this.product.productName + " was saved"); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function (message) {
        if (message) {
            this.messageService.addMessage(message);
        }
        // Navigate back to the product list
        this.router.navigate(["/products"]);
    };
    //this method takes in the path of the target tab to validate.
    ProductEditComponent.prototype.isValid = function (path) {
        var _this = this;
        this.validate();
        //if the path is not null, validate this path only
        if (path) {
            return this.dataIsValid[path];
        }
        //otherwise if it is null, check all paths in the dataIsValid key-value pair data structure
        //then the method checks the entry on the key-vale pair data structure and returns
        //true if all tabs are true
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; }));
    };
    ProductEditComponent.prototype.validate = function () {
        // Clear the validation object each time we do validation
        //to make sure we have a fresh key-value pair
        this.dataIsValid = {};
        // 'info' tab - then we add te logic to check our validation for the
        //info tab elements and then stores true or false as the value of the key-value pair
        //data structure
        if (this.product.productName &&
            this.product.productName.length >= 3 &&
            this.product.productCode) {
            this.dataIsValid['info'] = true;
        }
        else {
            this.dataIsValid['info'] = false;
        }
        // 'tags' tab
        if (this.product.category &&
            this.product.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/products/product-edit.component.html',
        styleUrls: ['./app/products/product-edit.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        message_service_1.MessageService,
        router_1.ActivatedRoute,
        router_1.Router])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map