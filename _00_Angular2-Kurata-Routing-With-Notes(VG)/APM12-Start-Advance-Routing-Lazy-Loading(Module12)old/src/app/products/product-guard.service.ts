import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

//ProductEditComponent is the generic paramter which signifies the target of this guard
@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

     //implement canDeactivate. ProductEditComponent is the generic paramter which signifies the target of this guard
    canDeactivate(component: ProductEditComponent): boolean {

        //check if there is unsaved data
        if (component.isDirty) {
            let productName = component.product.productName || 'New Product';

            //we use angular confirm() method before allowing the user to navigate away. 
            //we use  a BACK TICK to define a template literal and display the product name
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}
