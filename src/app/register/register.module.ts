import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';



@NgModule({
  declarations: [
    RegisterHomeComponent,
    PasswordStrengthComponent
    
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ],
  exports: [
    RegisterHomeComponent
  ]
})
export class RegisterModule { }
