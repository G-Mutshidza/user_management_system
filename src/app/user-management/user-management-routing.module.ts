import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AppGuardGuard } from '../security/app-guard.guard';


const routes: Routes = [
  { 
    path: 'admin-home', component: UserManagementHomeComponent,
    canActivate: [AppGuardGuard]
    
  },
  {
    path: '', redirectTo: 'admin-home', pathMatch: 'full'
  },
  {
    path: 'edit/:id', component: EditUserComponent,
    canActivate: [AppGuardGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
