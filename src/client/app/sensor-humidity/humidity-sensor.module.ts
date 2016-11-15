import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssHumiditySensorComponent } from './humidity-sensor.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssHumiditySensorComponent],
  exports: [GnssHumiditySensorComponent],
})
export class HumiditySensorModule { }
