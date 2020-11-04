// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedAreaRoutingModule } from './logged-area-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Services
import { ServicesModule } from 'src/app/services/services.module'

// Components
import { LoggedAreaComponent } from './logged-area.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule } from 'ngx-bootstrap/carousel'
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoggedAreaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    LoggedAreaRoutingModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot()
  ],
  bootstrap: [
    LoggedAreaComponent
  ]
})
export class LoggedAreaModule { }
