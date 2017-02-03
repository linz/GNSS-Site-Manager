import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalEpisodicEffectsGroupComponent } from './local-episodic-effects-group.component';
import { LocalEpisodicEffectItemComponent } from './local-episodic-effect-item.component';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';

@NgModule({
  imports: [CommonModule, FormsModule, DynamicFormFieldsModule],
  declarations: [LocalEpisodicEffectsGroupComponent, LocalEpisodicEffectItemComponent],
  exports: [ LocalEpisodicEffectsGroupComponent, LocalEpisodicEffectItemComponent, DynamicFormFieldsModule]
})
export class LocalEpisodicEffectModule { }
