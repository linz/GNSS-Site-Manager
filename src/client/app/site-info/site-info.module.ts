import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteInfoComponent } from './site-info.component';
import {GnssReceiverInfoModule} from '../gnss-receiver-info/gnss-receiver-info.module';

@NgModule({
  imports: [CommonModule, SharedModule, GnssReceiverInfoModule],
  declarations: [SiteInfoComponent],
  exports: [SiteInfoComponent],
})
export class SiteInfoModule { }
