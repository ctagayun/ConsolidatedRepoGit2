import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Product Management System';

    constructor(private authService: AuthService,
                private messageService: MessageService,
                private router: Router) {

        // router.events.subscribe((routerEvent: Event) => {
        //     this.checkRouterEvent(routerEvent);
        // });
    }

   
    //activating route programmatically - using navigateByUrl. this method
    //the entire set of URL paramters is replaced with the defined path
    //example /welcome
    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');  //this is a complete url path
      //  this.router.navigate('/welcome');
       // this.router.navigate(['/welcome']);
    }
}

 //NOTE Next step:  see user.module.ts on how to implement login