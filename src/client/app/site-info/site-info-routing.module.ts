import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteInfoComponent } from './site-info.component';
import { ConfirmDeactivateSiteInfoGuard } from './site-info-deactivate.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'siteInfo/:id',
        component: SiteInfoComponent,
        canDeactivate: [ConfirmDeactivateSiteInfoGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class SiteInfoRoutingModule { }
