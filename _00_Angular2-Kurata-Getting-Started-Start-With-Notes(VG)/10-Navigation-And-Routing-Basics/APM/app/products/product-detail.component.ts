//Note once done building this component we need to declare that component 
//in an Angular module 
import { Component } from '@angular/core'; //import the Component() function

import { IProduct } from './product';  //we need this because of IProduct view model

//Component() function
//Note no need for selector: because we are not nesting this component with another component/
//we'll instead display the component's view
@Component({
    templateUrl: 'app/products/product-detail.component.html'
})

export class ProductDetailComponent {
    pageTitle: string = 'Product Detail';
    product: IProduct;
}
