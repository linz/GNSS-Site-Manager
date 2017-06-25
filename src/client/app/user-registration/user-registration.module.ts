import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserRegistrationRoutingModule, FormInputModule],
  declarations: [UserRegistrationComponent],
  exports: [UserRegistrationComponent],
})
export class UserRegistrationModule { }
