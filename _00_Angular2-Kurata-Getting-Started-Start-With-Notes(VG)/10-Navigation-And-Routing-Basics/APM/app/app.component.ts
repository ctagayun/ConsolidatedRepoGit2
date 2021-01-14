import { Component } from '@angular/core';

import { ProductService } from './products/product.service';

//routerLink is a directive
@Component({
    selector: 'pm-app',
    template: `
   
    providers: [ ProductService ]
})

//the the menu above by using routerLink directive
export class AppComponent {
    pageTitle: string = `Acme Product Management`;
}
