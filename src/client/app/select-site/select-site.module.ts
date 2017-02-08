import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSiteComponent } from './select-site.component';
import { SelectSiteRoutingModule } from './select-site-routing.module';

@NgModule({
  imports: [CommonModule, SelectSiteRoutingModule],
  declarations: [SelectSiteComponent],
  exports: [SelectSiteComponent],
})
export class SelectSiteModule { }
