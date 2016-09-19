import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectSiteComponent } from './select-site.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SelectSiteComponent],
  exports: [SelectSiteComponent],
})
export class SelectSiteModule { }
