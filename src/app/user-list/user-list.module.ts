import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListHomeComponent } from './user-list-home/user-list-home.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


@NgModule({
  declarations: [
    UserListHomeComponent,
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  exports: [
    UserListHomeComponent,
  ]
})
export class UserListModule { }
