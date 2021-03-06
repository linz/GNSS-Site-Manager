import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HumiditySensorsGroupComponent } from './humidity-sensors-group.component';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [HumiditySensorsGroupComponent, HumiditySensorItemComponent],
    exports: [HumiditySensorsGroupComponent, HumiditySensorItemComponent]
})
export class HumiditySensorModule {
}
