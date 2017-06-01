import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';
import { MultipathSourceItemComponent } from './multipath-source-item.component';
import { MultipathSourceGroupComponent } from './multipath-source-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
    declarations: [MultipathSourceGroupComponent, MultipathSourceItemComponent],
    exports: [MultipathSourceGroupComponent, MultipathSourceItemComponent, DynamicFormFieldsModule]
})
export class MultipathSourceModule {
}
