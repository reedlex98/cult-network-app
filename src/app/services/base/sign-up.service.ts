// Dependencies
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// DTOs
import { SignUpResponse } from '../dto/sign-up.response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../util/validators/password-validator';
import { SignUpForm } from '../dto/sign-up-form';
import { ApiLivrosProxyService } from '../proxy/api-livros-proxy.service';
import { UfService } from '../util/services/uf.service';
import { Uf } from '../dto/uf';

@Injectable()
export class SignUpService {

  public signUpForm: FormGroup
  public errorMessages = {
    nome: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 6 caracteres'
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no máximo 60 caracteres'
      }
    ],
    cidade: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 5 caracteres'
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no máximo 30 caracteres'
      }
    ],
    email: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 6 caracteres'
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no máximo 60 caracteres'
      },
      {
        type: 'pattern',
        message: 'O formato de email digitado não é válido'
      }
    ],
    estado: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 2 caracteres'
      }
    ],
    idade: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      // {
      //   type: 'pattern',
      //   message: 'Apenas números são permitidos'
      // }
    ],
    endereco: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 6 caracteres'
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no mínimo 150 caracteres'
      }
    ],
    senha: [
      {
        type: 'required',
        message: 'Campo obrigatório'
      },
      {
        type: 'minChar',
        message: 'A senha deve ter no mínimo 8 caracteres'
      },
      {
        type: 'minSpecialChar',
        message: 'A senha deve ter no mínimo um caracter especial'
      },
      {
        type: 'minNumberChar',
        message: 'A senha deve ter no mínimo um caracter númerico'
      },
      {
        type: 'minUpperChar',
        message: 'A senha deve ter no mínimo um caracter maiúsculo'
      },
      {
        type: 'minLowerChar',
        message: 'A senha deve ter no mínimo um caracter minúsculo'
      },
      {
        type: 'hasEmptySpace',
        message: 'A senha não deve espaço em branco',
      }
    ]
  }

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private ufService: UfService,
    private formBuilder: FormBuilder,
  ) { }

  public getListUf() : Uf[]{
    return this.ufService.getListState()
  }

  public getErrorMessages(): any{
    return this.errorMessages
  }

  public getSignUpForm(): FormGroup {
    this.signUpForm = this.formBuilder.group(
      {
        nome: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60)])
        ),
        idade: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            // Validators.pattern('[a-zA-Z]'),
          ])
        ),
        senha: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            PasswordValidator.minChar,
            PasswordValidator.minUpperChar,
            PasswordValidator.minLowerChar,
            PasswordValidator.minNumberChar,
            PasswordValidator.minSpecialChar,
            PasswordValidator.hasEmptySpace])
        ),
        endereco: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(150)])
        ),
        cidade: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30)])
        ),
        estado: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2)])
        ),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60),
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}'),
          ])
        ),
        latitude: new FormControl(
          '',
          Validators.compose([
          ])
        ),
        longitude: new FormControl(
          '',
          Validators.compose([
          ])
        )
      }
    )
    return this.signUpForm;
  }

  public signUp(signUpForm: SignUpForm) : Observable<SignUpResponse> {
    return this.apiLivrosProxyService
      .signUp(signUpForm)
  }

}
