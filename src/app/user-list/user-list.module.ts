import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListHomeComponent } from './user-list-home/user-list-home.component';



@NgModule({
  declarations: [
    UserListHomeComponent,
   
  ],
  imports: [
    CommonModule,
    UserListRoutingModule
  ],
  exports: [
    UserListHomeComponent,
  ]
})
export class UserListModule { }
