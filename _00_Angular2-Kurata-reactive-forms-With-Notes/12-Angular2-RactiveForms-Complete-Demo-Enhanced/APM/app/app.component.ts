import { Component } from '@angular/core';

@Component({
    selector: 'pm-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/products']">Product List</a></li>
                    <li><a [routerLink]="['/productEdit/0']">Add Product</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `

})
export class AppComponent {
    pageTitle: string = `Acme Product Management`;
}

 //  <router-outlet></router-outlet> - is a route directive. We place this directive in the
 // host component (i.e where the view is going to be displayed)
 // Invoke the productEdit component: <li><a [routerLink]="['/productEdit/0']">Add Product</a></li> -
 //  the "0" means that when the ProductEdit component
 // sees a "0" in the paramter, it means we want to add a new product instead of editing a product

 //see product-list.component to see how the "editProduct" is invoked


