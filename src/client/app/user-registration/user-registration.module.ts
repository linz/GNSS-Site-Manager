import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserRegistrationRoutingModule, DynamicFormFieldsModule],
  declarations: [UserRegistrationComponent],
  exports: [UserRegistrationComponent],
})
export class UserRegistrationModule { }
