import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnssReceiverInfoComponent } from './gnss-receiver-info.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [GnssReceiverInfoComponent],
  exports: [GnssReceiverInfoComponent],
})
export class GnssReceiverInfoModule { }
