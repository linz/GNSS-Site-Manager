import { UserAuthService } from '../global/user-auth.service';

export abstract class AbstractBaseComponent {

    constructor(protected userAuthService: UserAuthService) {
    }

    protected isEditable(): boolean {
        return this.userAuthService.hasAuthorityToEditSite();
    }
}
