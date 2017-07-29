import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { OtherInstrumentationItemComponent } from './other-instrumentation-item.component';
import { OtherInstrumentationGroupComponent } from './other-instrumentation-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [OtherInstrumentationGroupComponent, OtherInstrumentationItemComponent],
    exports: [OtherInstrumentationGroupComponent, OtherInstrumentationItemComponent, FormInputModule]
})
export class OtherInstrumentationModule {
}
