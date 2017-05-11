import { CanDeactivate } from '@angular/router';
import { SiteLogComponent } from './site-log.component';

export class ConfirmDeactivateSiteLogGuard implements CanDeactivate<SiteLogComponent> {

  canDeactivate(target: SiteLogComponent): Promise<boolean> {
    if(target.isFormDirty()) {
        return target.confirmCloseSiteLogPage();
    }
    return Promise.resolve(true);
  }
}
