//third we need to import what we need from any third party library, from our modules or from angular itself
//it requires an import keyword followed by the member name and module path
//the path to the module path must be enclosed in quotes and it is case sensitive and need to specify file extension
import { Component } from '@angular/core';


//second use Component decorator to define the component metadata which includes the HTML for the component's template
//be sure to prefix the decorator with an @ sign
//since decorators are functions ad a parenthesis and pass in appropriate object literals in this example a json object 
//enclosed in brackets as function arguments.
@Component({
    selector: 'pm-app',  //use selector property to define the name of the component when used as a directive in HTML.
                         //selector property is not needed if the component is not used in any HTML
    template: '<h1>Angular2: Getting Started</h1>' //use template property to define the view of the HTML. We call
                                                   //this a directive. A directive is basically a custom HTML element.
})

//first create a class with code to support the view
export class AppComponent { } // class name is PascalCasing. Always append "Component" to the name 
                              // and use "export" keyword to makethe class importable by other parts of the application
                              // then add data proporties in camel case
                              // create appropriate logic in the methods (alse use camel case for method names)
