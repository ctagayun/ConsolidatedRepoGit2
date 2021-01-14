import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from '@angular/router'; 
import { ProductEditComponent } from './product-edit.component';
//because this class guard is a service, we need to register the service
//with angular's injector
@Injectable()
export class ProductDetailGuard implements CanActivate {  //CanActivate is a route guard

    constructor(private _router: Router) {   //injecting router service
    }

    //implementing canActivate() guard
    //our guard is meant to prevent routing to /products if id is NaN or id is less than 1
    //the ActivatedRouteSnapshot gives us the activated route snapshot. The activated route snap shot
    //contains the information about a route at any particular moment in time
    canActivate(route: ActivatedRouteSnapshot): boolean {

        //the product detail url is comprised of two segments...product/requested id  product is index 0, id is index 1
        //we only care about the id so we pull the path from  index of 1
        //the + sign converts the url to string
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');
            this._router.navigate(['/products']); //we need the router so we import it above
            return false;
        };
        return true;
    }
}

@Injectable()
export  class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

    canDeactivate(component: ProductEditComponent): boolean {
        if (component.productForm.dirty) {
            let productName = component.productForm.get('productName').value || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}
