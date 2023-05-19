import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListHomeComponent } from './user-list-home/user-list-home.component';
import { AppGuardGuard } from '../security/app-guard.guard';



const routes: Routes = [
  { 
    path: 'user-home', component: UserListHomeComponent,
    canActivate: [AppGuardGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
