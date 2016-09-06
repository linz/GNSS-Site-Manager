import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteInfoComponent } from './site-info.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SiteInfoComponent],
  exports: [SiteInfoComponent],
})
  // providers: [NameListService]
export class SiteInfoModule { }
