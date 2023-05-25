import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserManagementModule } from './user-management/user-management.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListModule } from './user-list/user-list.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UpdateComponent } from './update/update.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';



@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    UpdateComponent,
    UpdatePasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule, 
    RegisterModule,
    UserListModule,
    UserManagementModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
