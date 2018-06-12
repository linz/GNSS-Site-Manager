import { Component } from '@angular/core';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent {
	constructor(private userAuthService: UserAuthService) {

	}

    public newUserSignUpUrl() {
        return this.userAuthService.getUserSignUpUrl();
    }
}
