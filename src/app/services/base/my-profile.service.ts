import { GetUserResponse } from './../dto/get-user.response';
import { DefaultResponse } from './../dto/default.response';
import { GoogleBooksProxyService } from './../proxy/google-books.proxy.service';
import { AddBookForm } from './../dto/add-book-form';
import { TokenResponse } from './../dto/token.response';
// Dependencies
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IsbnValidator } from '../util/validators/isbn-validator';

// Services
import { ApiLivrosProxyService } from '../proxy/api-livros-proxy.service';
import { map, tap } from 'rxjs/operators';
import { BookResponse } from '../dto/book.response';
import { PasswordValidator } from '../util/validators/password-validator';
import { SignUpForm } from '../dto/sign-up-form';
import { UfService } from '../util/services/uf.service';
import { Uf } from '../dto/uf';

@Injectable()
export class MyProfileService {
  public updateProfileForm: FormGroup;
  public errorMessages = {
    nome: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 6 caracteres',
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no máximo 60 caracteres',
      },
    ],
    cidade: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 5 caracteres',
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no máximo 30 caracteres',
      },
    ],
    email: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 6 caracteres',
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no máximo 60 caracteres',
      },
      {
        type: 'pattern',
        message: 'O formato de email digitado não é válido',
      },
    ],
    estado: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 2 caracteres',
      },
    ],
    idade: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      // {
      //   type: 'pattern',
      //   message: 'Apenas números são permitidos'
      // }
    ],
    endereco: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'minlength',
        message: 'O campo deve ter no mínimo 6 caracteres',
      },
      {
        type: 'maxlength',
        message: 'O campo deve ter no mínimo 150 caracteres',
      },
    ],
    senha: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'minChar',
        message: 'A senha deve ter no mínimo 8 caracteres',
      },
      {
        type: 'minSpecialChar',
        message: 'A senha deve ter no mínimo um caracter especial',
      },
      {
        type: 'minNumberChar',
        message: 'A senha deve ter no mínimo um caracter númerico',
      },
      {
        type: 'minUpperChar',
        message: 'A senha deve ter no mínimo um caracter maiúsculo',
      },
      {
        type: 'minLowerChar',
        message: 'A senha deve ter no mínimo um caracter minúsculo',
      },
      {
        type: 'hasEmptySpace',
        message: 'A senha não deve espaço em branco',
      },
    ],
  };

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private formBuilder: FormBuilder,
    private ufService: UfService
  ) {}

  public getErrorMessages(): any {
    return this.errorMessages;
  }

  public getListUf(): Uf[] {
    return this.ufService.getListState();
  }

  getUserData(): Observable<GetUserResponse> {
    return this.apiLivrosProxyService.getUserData();
  }

  public getUpdateProfileForm(): FormGroup {
    this.updateProfileForm = this.formBuilder.group({
      nome: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(60),
        ])
      ),
      idade: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('[a-zA-Z]'),
        ])
      ),
      senha: new FormControl('', Validators.compose([Validators.required])),
      endereco: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(150),
        ])
      ),
      cidade: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ])
      ),
      estado: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
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
      latitude: new FormControl('', Validators.compose([])),
      longitude: new FormControl('', Validators.compose([])),
    });
    return this.updateProfileForm;
  }

  public getPreviousProfileData(): Observable<GetUserResponse> {
    return this.apiLivrosProxyService.getUserData();
  }

  public patchGetUserResponseValueToForm(getUserResponse: GetUserResponse) {
    this.updateProfileForm.patchValue({
      nome: getUserResponse.Nome,
      senha: getUserResponse.Senha,
      email: getUserResponse.Email,
      idade: getUserResponse.Idade,
      endereco: getUserResponse.Endereco,
      cidade: getUserResponse.Cidade,
      estado: getUserResponse.Estado,
      latitude: getUserResponse.Latitude,
      longitude: getUserResponse.Longitude,
    });
    return this.updateProfileForm;
  }

  public updateUserData(
    updateUserForm: SignUpForm
  ): Observable<DefaultResponse> {
    return this.apiLivrosProxyService.updateUserData(updateUserForm);
  }
}
