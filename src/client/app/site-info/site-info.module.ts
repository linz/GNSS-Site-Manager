import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteInfoComponent } from './site-info.component';
import { GnssReceiverInfoModule } from '../gnss-receiver-info/gnss-receiver-info.module';
import { FrequencyStandardModule } from '../frequency-standard/frequency-standard.module';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, SharedModule, GnssReceiverInfoModule, FrequencyStandardModule, DatetimePickerModule],
  declarations: [SiteInfoComponent],
  exports: [SiteInfoComponent],
})
export class SiteInfoModule { }
