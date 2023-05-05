import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserListModule } from './user-list/user-list.module';
import { UserManagementModule } from './user-management/user-management.module';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    PasswordStrengthComponent,
    EditComponent,
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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
