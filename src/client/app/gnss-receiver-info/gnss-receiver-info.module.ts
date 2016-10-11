import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GnssReceiverInfoComponent} from './gnss-receiver-info.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GnssReceiverInfoComponent],
  exports: [GnssReceiverInfoComponent],
})
export class GnssReceiverInfoModule { }
