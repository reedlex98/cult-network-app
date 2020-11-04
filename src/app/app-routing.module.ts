import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';


const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'auth',
    loadChildren: './components/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'app',
    loadChildren: './components/logged-area/logged-area.module#LoggedAreaModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
