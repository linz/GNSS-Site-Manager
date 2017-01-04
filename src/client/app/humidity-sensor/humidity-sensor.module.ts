import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HumiditySensorsGroupComponent } from './humidity-sensors-group.component';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [HumiditySensorsGroupComponent, HumiditySensorItemComponent],
  exports: [ HumiditySensorsGroupComponent, HumiditySensorItemComponent],
})
export class HumiditySensorModule { }
