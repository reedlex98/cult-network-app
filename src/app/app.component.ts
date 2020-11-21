import { Component, OnDestroy } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { SignInService } from './services/base/sign-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent{
  public SPINNER = SPINNER;
  // constructor(private signInService: SignInService) {
  //   console.log(this.signInService.tokenResponseValue);
  //   window.onbe = () => {
  //     console.log('unloading');
  //     this.signInService.logout();
  //   };
  // }
}
