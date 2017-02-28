import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsiblePartyComponent } from './responsible-party.component';
import { ResponsiblePartyGroupComponent } from './responsible-party2-group.component';
import { ResponsiblePartyItemComponent } from './responsible-party2-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [ ResponsiblePartyComponent, ResponsiblePartyGroupComponent, ResponsiblePartyItemComponent ],
  exports: [ ResponsiblePartyComponent, ResponsiblePartyGroupComponent, ResponsiblePartyItemComponent ],
})
export class ResponsiblePartyModule { }
