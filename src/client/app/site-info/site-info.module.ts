import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteInfoComponent } from './site-info.component';
import { GnssReceiverInfoModule } from '../gnss-receiver-info/gnss-receiver-info.module';
import { FrequencyStandardModule } from '../frequency-standard/frequency-standard.module';
import { EpisodicEffectModule } from '../episodic-effect/episodic-effect.module';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';
import { HumiditySensorModule } from '../sensor-humidity/humidity-sensor.module';
import { PressureSensorModule } from '../pressure-sensor/pressure-sensor.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GnssReceiverInfoModule,
    DatetimePickerModule,
    HumiditySensorModule,
    PressureSensorModule,
    EpisodicEffectModule,
    FrequencyStandardModule
  ],
  declarations: [SiteInfoComponent],
  exports: [SiteInfoComponent],
})

export class SiteInfoModule { }
