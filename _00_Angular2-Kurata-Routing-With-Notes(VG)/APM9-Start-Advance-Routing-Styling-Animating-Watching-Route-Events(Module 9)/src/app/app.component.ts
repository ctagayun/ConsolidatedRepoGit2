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

    //define a property that specifies whether r not a route is loading
    //we will use this property to turn the spinner on or off
    loading: boolean = true;

    constructor(private authService: AuthService,
                private messageService: MessageService,
                private router: Router) {

        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

  checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            //if navigation start set loading property to true to turn on our spinner
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }
   
//    displayMessages(): void {
//         // Example of primary and secondary routing together
//         // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
//         // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
//         this.router.navigate([{outlets: { popup: ['messages']}}]); // Works
//         this.messageService.isDisplayed = true;
//     }

//     hideMessages(): void {
//         this.router.navigate([{ outlets: { popup: null } }]);
//         this.messageService.isDisplayed = false;
//     }

   

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