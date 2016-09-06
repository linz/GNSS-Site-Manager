import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SelectSiteComponent } from './select-site.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SelectSiteComponent],
  exports: [SelectSiteComponent],
})
  // providers: [NameListService]
export class SelectSiteModule { }
