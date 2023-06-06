import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { RedirectGuard } from '../security/redirect.guard';


const routes: Routes = [
  { 
    path: 'sign-up', component: RegisterHomeComponent,
    canActivate: [RedirectGuard]
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
