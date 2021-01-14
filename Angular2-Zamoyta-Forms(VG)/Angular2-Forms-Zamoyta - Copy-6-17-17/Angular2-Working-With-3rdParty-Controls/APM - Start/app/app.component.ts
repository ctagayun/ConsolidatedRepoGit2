import { Component } from '@angular/core';


//pass in an object into @COmponent module
//pm-app is the name of the component
@Component({
    selector: 'pm-app',
    template: `
       <div class="container"> <h1> {{pageTitle}} </h1>
         <gn-home> </gn-home>
       </div>
      `
})


export class AppComponent {
    pageTitle: string = 'Green Nation';

    
 }


