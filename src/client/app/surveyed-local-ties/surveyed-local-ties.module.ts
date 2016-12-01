import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyedLocalTiesComponent } from './surveyed-local-ties.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [SurveyedLocalTiesComponent],
  exports: [SurveyedLocalTiesComponent],
})
export class SurveyedLocalTiesModule { }
