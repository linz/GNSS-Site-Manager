import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';
import { RadioInterferenceItemComponent } from './radio-interference-item.component';
import { RadioInterferenceGroupComponent } from './radio-interference-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
    declarations: [RadioInterferenceGroupComponent, RadioInterferenceItemComponent],
    exports: [RadioInterferenceGroupComponent, RadioInterferenceItemComponent, DynamicFormFieldsModule]
})
export class RadioInterferenceModule {
}
