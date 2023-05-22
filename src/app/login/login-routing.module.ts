import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomeComponent } from './login-home/login-home.component';
import { AppGuardGuard } from '../security/app-guard.guard';

const routes: Routes = [
  { 
    path: 'sign-in', component: LoginHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
