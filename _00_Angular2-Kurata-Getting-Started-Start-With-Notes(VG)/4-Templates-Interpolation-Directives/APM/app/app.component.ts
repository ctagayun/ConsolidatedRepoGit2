import { Component } from '@angular/core';

//pm-products is another component defined in product-lst.component.ts
@Component({
    selector: 'pm-app',
    template: `
    <div><h1>{{pageTitle}}</h1>
        <pm-products></pm-products>
    </div>
    `
})
export class AppComponent {
    pageTitle: string = `Midland Product Management`;
}


//Note: add this to the AppModule.ts