import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';

@NgModule({
    declarations: [ StarComponent ],
    imports: [ CommonModule ],
    exports: [    //this is the exports array. it allows us to share an Angular module's
                  //components, directives, and pipes with other modules.
                  //it can also re-exports angular modules and 3rd party modules... such as FormsModule 
                 //and CommonModule
                 //we can re-export something without importing it first.
                 //never export a service
        CommonModule, 
        FormsModule, 
        StarComponent
    ]
})
export class SharedModule { }
