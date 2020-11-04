import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { AuthenticationComponent } from './authentication.component';


const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  children: [
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full',
    },
    {
      path: 'sign-up',
      component: SignUpFormComponent
    },
    {
      path: 'sign-in',
      component: SignInFormComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
