import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { SignInService } from 'src/app/services/base/sign-in.service';
import { SignInForm } from 'src/app/services/dto/sign-in-form';
import { Uf } from 'src/app/services/dto/uf';



@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  public signInForm: FormGroup;
  public errorMessages: any;
  public listUf: Uf[];

  constructor(private signInService: SignInService){

  }

  ngOnInit(){
    this.signInForm = this.signInService.getSignInForm();
    this.errorMessages = this.signInService.getErrorMessages();
    console.log(this.signInForm);
  }

  signIn(){
    this.signInService.signIn(this.signInForm.value)
      .subscribe(res => {
        console.log(res)
      });
  }
}
