import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { AppGuardGuard } from '../security/app-guard.guard';

const routes: Routes = [
  { 
    path: 'admin-home', component: UserManagementHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
