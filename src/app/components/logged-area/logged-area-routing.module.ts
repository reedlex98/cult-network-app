import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedAreaComponent } from './logged-area.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedAreaComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'add-book',
        component: AddBookComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedAreaRoutingModule {}
