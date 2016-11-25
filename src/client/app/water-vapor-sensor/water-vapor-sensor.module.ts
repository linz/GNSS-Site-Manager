import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssWaterVaporSensorComponent } from './water-vapor-sensor.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssWaterVaporSensorComponent],
  exports: [GnssWaterVaporSensorComponent],
})
export class WaterVaporSensorModule { }
