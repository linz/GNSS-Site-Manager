import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalEpisodicEventsGroupComponent } from './local-episodic-events-group.component';
import { LocalEpisodicEventItemComponent } from './local-episodic-event-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
  declarations: [LocalEpisodicEventsGroupComponent, LocalEpisodicEventItemComponent],
  exports: [ LocalEpisodicEventsGroupComponent, LocalEpisodicEventItemComponent, DynamicFormFieldsModule]
})
export class LocalEpisodicEventModule { }
