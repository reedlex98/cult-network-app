import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedAreaComponent } from './logged-area.component';


const routes: Routes = [{
  path: '',
  component: LoggedAreaComponent,
  children: [
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedAreaRoutingModule { }
