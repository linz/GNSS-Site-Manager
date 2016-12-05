import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssHumiditySensorComponent } from './humidity-sensor.component';
import { HumiditySensorsGroupComponent } from './humidity-sensors-group.component';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssHumiditySensorComponent, HumiditySensorsGroupComponent, HumiditySensorItemComponent],
  exports: [GnssHumiditySensorComponent, HumiditySensorsGroupComponent, HumiditySensorItemComponent],
})
export class HumiditySensorModule { }
