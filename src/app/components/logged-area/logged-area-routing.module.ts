import { MyLibraryComponent } from './my-library/my-library.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/pageNotFound/page-not-found.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedAreaComponent } from './logged-area.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

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
      {
        path: 'my-library',
        component: MyLibraryComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
      }
    ],
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedAreaRoutingModule {}
