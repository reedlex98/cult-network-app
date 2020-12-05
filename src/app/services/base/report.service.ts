import { ApiLivrosProxyService } from './../proxy/api-livros-proxy.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReportResponse } from '../dto/report.response';

@Injectable()
export class ReportService {
  public reportForm: FormGroup;

  constructor(
    private apiLivrosProxyService: ApiLivrosProxyService,
    private formBuilder: FormBuilder
  ) {}

  public errorMessages = {
    message: [
      {
        type: 'required',
        message: 'Campo obrigatório',
      },
      {
        type: 'maxlength',
        message: 'Não pode exceder o máximo de 250 caracteres',
      },
    ],
    reportedEmail: [
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
  };

  public sendReport(
    message: string,
    reportedEmail: string
  ): Observable<ReportResponse> {
    return this.apiLivrosProxyService.sendReport(message, reportedEmail);
  }

  public getReportForm(): FormGroup {
    this.reportForm = this.formBuilder.group({
      message: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)])
      ),
      reportedEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(60),
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}'),
        ])
      ),
    });
    return this.reportForm;
  }
}
