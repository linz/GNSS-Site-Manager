import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssAntennaItemComponent } from './gnss-antenna-item.component';
import { GnssAntennaGroupComponent } from './gnss-antenna-group.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssAntennaItemComponent, GnssAntennaGroupComponent],
  exports: [GnssAntennaItemComponent, GnssAntennaGroupComponent],
})
export class GnssAntennaModule { }
