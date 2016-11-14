import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrequencyStandardComponent } from './frequency-standard.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [FrequencyStandardComponent],
  exports: [FrequencyStandardComponent],
})
export class FrequencyStandardModule { }
