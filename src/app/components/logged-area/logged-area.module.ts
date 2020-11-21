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
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { AddBookService } from 'src/app/services/base/add-book.service';

@NgModule({
  declarations: [LoggedAreaComponent, DashboardComponent, AddBookComponent],
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
    AddBookService
  ],
  bootstrap: [LoggedAreaComponent],
})
export class LoggedAreaModule {}
