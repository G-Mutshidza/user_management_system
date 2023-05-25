import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { AuthGuard } from '../security/auth.guard';


const routes: Routes = [
  { 
    path: 'sign-up', component: RegisterHomeComponent,
    // canDeactivate: [AuthGuard]
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
