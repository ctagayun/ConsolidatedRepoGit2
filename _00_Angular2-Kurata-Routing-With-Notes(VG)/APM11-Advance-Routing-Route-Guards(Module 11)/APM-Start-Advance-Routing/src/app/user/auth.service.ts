import { Injectable } from '@angular/core';

import { IUser } from './user';
import { MessageService } from '../messages/message.service';

@Injectable()
export class AuthService {
    currentUser: IUser;
    
    //SHARING DATA ACCROSS ROUTES
    //this is a property to track and share a redirect url. in our scenario, when a user selects
    //"Add Product" he is redirected to login page. We will use this propety to send the user back to 
    //"Add Product" after logging in.

    //SINCE in our auth-guard.service.ts we are injecting already aut.service.ts our
    //route guard will hae access to to this property
    redirectUrl: string;

    constructor(private messageService: MessageService) { }

    //returns true if tere is a current user
    //the double bang !! coerces the object to a boolean value
    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        if (!userName || !password) {
            this.messageService.addMessage('Please enter your userName and password');
            return;
        }
        if (userName === 'admin') {
            this.currentUser = {
                id: 1,
                userName: userName,
                isAdmin: true
            };
            this.messageService.addMessage('Admin login');
            return;
        }
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };
        this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    }

    logout(): void {
        this.currentUser = null;
    }
}

//Note: since the auth.serice.ts is part of the user feature we will add it to the user.module.ts