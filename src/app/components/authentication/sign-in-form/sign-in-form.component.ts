import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignUpService } from 'src/app/services/base/sign-up.service';
import { SignUpForm } from 'src/app/services/dto/sign-up-form';
import { Uf } from 'src/app/services/dto/uf';



@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
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
}
