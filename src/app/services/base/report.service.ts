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
        Validators.compose([Validators.required])
      ),
    });
    return this.reportForm;
  }
}
