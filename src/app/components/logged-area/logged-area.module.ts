import { SearchBookComponent } from './search-book/search-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedAreaRoutingModule } from './logged-area-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Services
import { ServicesModule } from 'src/app/services/services.module';

// Components
import { LoggedAreaComponent } from './logged-area.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { AddBookService } from 'src/app/services/base/add-book.service';
import { MyLibraryComponent } from './my-library/my-library.component';
import { MyLibraryService } from 'src/app/services/base/my-library.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileService } from 'src/app/services/base/my-profile.service';
import { SearchBookService } from 'src/app/services/base/search-book.service';
import { ReportComponent } from './report/report.component';
import { ReportService } from 'src/app/services/base/report.service';

@NgModule({
  declarations: [
    LoggedAreaComponent,
    DashboardComponent,
    AddBookComponent,
    MyLibraryComponent,
    MyProfileComponent,
    SearchBookComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    LoggedAreaRoutingModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    AddBookService,
    MyLibraryService,
    MyProfileService,
    SearchBookService,
    ReportService
  ],
  bootstrap: [LoggedAreaComponent],
})
export class LoggedAreaModule {}
