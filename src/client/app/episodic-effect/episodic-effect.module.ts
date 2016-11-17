import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpisodicEffectComponent } from './episodic-effect.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, DatetimePickerModule],
  declarations: [EpisodicEffectComponent],
  exports: [EpisodicEffectComponent],
})

export class EpisodicEffectModule { }
