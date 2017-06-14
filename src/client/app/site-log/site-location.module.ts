import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLocationComponent } from './site-location.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DynamicFormFieldsModule,
    ],
    declarations: [SiteLocationComponent],
    exports: [SiteLocationComponent],
})

export class SiteLocationModule {
}
