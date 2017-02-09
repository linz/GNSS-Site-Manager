import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteInfoComponent } from './site-info.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'siteInfo/:id', component: SiteInfoComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SiteInfoRoutingModule { }
