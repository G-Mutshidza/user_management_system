import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserManagementHomeComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserManagementHomeComponent
  ]
})
export class UserManagementModule { }
