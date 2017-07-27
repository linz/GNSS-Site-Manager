import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '../shared/form-input/form-input.module';
import { CollocationInformationItemComponent } from './collocation-information-item.component';
import { CollocationInformationGroupComponent } from './collocation-information-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputModule],
    declarations: [CollocationInformationGroupComponent, CollocationInformationItemComponent],
    exports: [CollocationInformationGroupComponent, CollocationInformationItemComponent, FormInputModule]
})
export class CollocationInformationModule {
}
