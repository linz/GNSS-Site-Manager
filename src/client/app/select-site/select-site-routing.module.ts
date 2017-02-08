import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectSiteComponent } from './select-site.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: SelectSiteComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SelectSiteRoutingModule { }
