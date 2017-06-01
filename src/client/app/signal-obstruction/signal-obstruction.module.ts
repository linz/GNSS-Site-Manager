import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';
import { SignalObstructionItemComponent } from './signal-obstruction-item.component';
import { SignalObstructionGroupComponent } from './signal-obstruction-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFormFieldsModule],
    declarations: [SignalObstructionGroupComponent, SignalObstructionItemComponent],
    exports: [SignalObstructionGroupComponent, SignalObstructionItemComponent, DynamicFormFieldsModule]
})
export class SignalObstructionModule {
}
