//Step 3: do your imports
//importing an angular 2.0 library module
//here we are importing a library memeber name  called  Component which is a function
import { Component } from '@angular/core'

//Step 2: Create the metadata
//this is the metadata for the c# component class we called AppComponent
//the selector is a directive which says that AppComponent class is to be referenced as "pm-app" in the html
//it also defines the view that the AppComponent class will populate 

//a class becomes a component when we give it a @component metadata.
//we define the metadata buy using the @Component() function
@Component({
    selector: 'pm-app',
    template: `
    <div><h1>{{pageTitle}}</h1>
        <div>My First Component</div>
    </div>
    `
})

//Step 1.
//the component name is AppComponent
//our class has an "export" keyword our class is now a module and therefore will be loaded
//by our module loader no need to add a script tag for it. 

//the next step is to define a template associated with this component class. How do we do that?
//We do that by metadata (see @component). Angular needs that metadata to instantiate that component
//and construct the view
export class AppComponent {
    pageTitle: string = `Product Management System`;
}
