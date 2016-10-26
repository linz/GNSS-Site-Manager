import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatetimePickerComponent } from './datetime-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, DatepickerModule],
  declarations: [DatetimePickerComponent],
  exports: [DatetimePickerComponent],
})
export class DatetimePickerModule { }
