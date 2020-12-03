import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReportService } from './../../../services/base/report.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  public reportForm: FormGroup;
  public errorMessages: any;

  constructor(
    private reportService: ReportService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.errorMessages = this.reportService.errorMessages;
    this.reportForm = this.reportService.getReportForm();
  }

  sendReport() {
    // this.reportService.sendReport(
    //   this.reportForm.get('message').value,
    //   this.reportForm.get('reportedEmail').value
    // );
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
      this.toastr.show(
        'Aguarde, entraremos em contato com a pessoa que você denunciou',
        'Denúncia enviada com sucessou!'
      );
      this.router.navigate(['app/dashboard']);
    }, 3000);
  }
}
