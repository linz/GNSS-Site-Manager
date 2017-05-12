import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteLogComponent } from './site-log.component';
import { ConfirmDeactivateSiteLogGuard } from './site-log-deactivate.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'siteLog/:id',
        component: SiteLogComponent,
        canDeactivate: [ConfirmDeactivateSiteLogGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class SiteLogRoutingModule { }
