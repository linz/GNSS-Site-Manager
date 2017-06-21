import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { UserAuthService } from '../shared/global/user-auth.service';
import { MultipathSourceViewModel } from './multipath-source-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'multipath-source-group',
    templateUrl: 'multipath-source-group.component.html',
})
export class MultipathSourceGroupComponent extends AbstractGroupComponent<MultipathSourceViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Multipath Source';
    }

    getControlName(): string {
        return 'multipathSources';
    }

    getNewItemViewModel(): MultipathSourceViewModel {
        return new MultipathSourceViewModel();
    }
}
