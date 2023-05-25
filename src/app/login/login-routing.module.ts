import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomeComponent } from './login-home/login-home.component';
import { AuthGuard } from '../security/auth.guard';



const routes: Routes = [
  { 
    path: 'sign-in', component: LoginHomeComponent,
    // canDeactivate: [AuthGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
