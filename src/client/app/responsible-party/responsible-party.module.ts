import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsiblePartyGroupComponent } from './responsible-party-group.component';
import { ResponsiblePartyItemComponent } from './responsible-party-item.component';
import { FormInputModule } from '../shared/form-input/form-input.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [ResponsiblePartyGroupComponent, ResponsiblePartyItemComponent],
    exports: [ResponsiblePartyGroupComponent, ResponsiblePartyItemComponent, FormInputModule]
})
export class ResponsiblePartyModule {
}
