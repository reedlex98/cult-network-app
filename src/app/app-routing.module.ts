import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { PageNotFoundComponent } from './shared/components/pageNotFound/page-not-found.component';
import { AuthGuard } from './shared/helpers/auth-guard';


const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'auth',
    loadChildren: './components/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'app',
    loadChildren: './components/logged-area/logged-area.module#LoggedAreaModule',
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
