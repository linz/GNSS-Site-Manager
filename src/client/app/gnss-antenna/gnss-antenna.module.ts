import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssAntennaItemComponent } from './gnss-antenna-item.component';
import { GnssAntennaGroupComponent } from './gnss-antenna-group.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, DynamicFormFieldsModule],
  declarations: [GnssAntennaItemComponent, GnssAntennaGroupComponent],
  exports: [GnssAntennaItemComponent, GnssAntennaGroupComponent],
})
export class GnssAntennaModule { }
