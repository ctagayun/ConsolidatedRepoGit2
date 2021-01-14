import { Component } from '@angular/core';

@Component({
  //selector: 'pm-home'  - no need for this selector because it will be displayed in the
  //<router-outlet> in appcomponent.html  because it is the default route when 
  //the application is started. so you don'need a <pm-home> </pm-home> in appcomponent.html
  //instead you replace it with <router-outlet>

  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
}
