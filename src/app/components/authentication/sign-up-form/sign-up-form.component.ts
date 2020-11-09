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
  public userPosition: any

  constructor(private signUpService: SignUpService){

  }

  ngOnInit(){
    this.signUpForm = this.signUpService.getSignUpForm()
    this.errorMessages = this.signUpService.getErrorMessages()
    this.listUf = this.signUpService.getListUf()
    this.findMe()
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = position;
        this.signUpForm.patchValue({
          "latitude":  this.userPosition.coords.latitude,
          "longitude":  this.userPosition.coords.longitude
        })
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  signUp(){
    console.log("here")
    this.signUpService.signUp(this.signUpForm.value)
      .subscribe(res => {
        console.log(this.signUpForm.value)
        console.log(res)
      })
  }
}
