import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PressureSensorsGroupComponent } from './pressure-sensors-group.component';
import { PressureSensorItemComponent } from './pressure-sensor-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, DynamicFormFieldsModule],
  declarations: [PressureSensorsGroupComponent, PressureSensorItemComponent],
  exports: [ PressureSensorsGroupComponent, PressureSensorItemComponent, DynamicFormFieldsModule]
})
export class PressureSensorModule { }
