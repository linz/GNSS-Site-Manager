import { ServiceLocator } from '../../app.module';
import { UserAuthService } from '../global/user-auth.service';

export abstract class AbstractBaseComponent {

    private userAuthService: UserAuthService;

    constructor() {
        this.userAuthService = ServiceLocator.injector.get(UserAuthService);
    }

    protected isEditable(): boolean {
        return this.userAuthService.hasAuthorityToEditSite();
    }
}
