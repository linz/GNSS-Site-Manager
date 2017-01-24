import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssReceiversGroupComponent } from './gnss-receivers-group.component';
import { GnssReceiverItemComponent } from './gnss-receiver-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, DynamicFormFieldsModule],
  declarations: [GnssReceiversGroupComponent, GnssReceiverItemComponent],
  exports: [ GnssReceiversGroupComponent, GnssReceiverItemComponent, DynamicFormFieldsModule]
})
export class GnssReceiverModule { }
