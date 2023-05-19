import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { Ng2OrderModule } from 'ng2-order-pipe';









@NgModule({
  declarations: [
    RegisterHomeComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterHomeComponent
  ]
})
export class RegisterModule { }
