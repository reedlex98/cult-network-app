import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { SignUpService } from 'src/app/services/base/sign-up.service';
import { SignUpForm } from 'src/app/services/dto/sign-up-form';
import { Uf } from 'src/app/services/dto/uf';



@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  public signUpForm: FormGroup
  public errorMessages: any
  public listUf: Uf[]

  constructor(private signUpService: SignUpService){

  }

  ngOnInit(){
    this.signUpForm = this.signUpService.getSignUpForm()
    this.errorMessages = this.signUpService.getErrorMessages()
    this.listUf = this.signUpService.getListUf()
    console.log(this.signUpForm)
  }

  signUp(){
    console.log("here")
    this.signUpService.signUp(this.signUpForm.getRawValue())
      .pipe(
        tap(res => {
          console.log(res)
        })
      )
  }
}
