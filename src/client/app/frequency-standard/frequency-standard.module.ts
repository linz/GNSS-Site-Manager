import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrequencyStandardItemComponent } from './frequency-standard-item.component';
import { FrequencyStandardGroupComponent } from './frequency-standard-group.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [FrequencyStandardItemComponent, FrequencyStandardGroupComponent],
  exports: [FrequencyStandardItemComponent, FrequencyStandardGroupComponent],
})
export class FrequencyStandardModule { }
