import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { UserAuthService } from '../shared/global/user-auth.service';
import { RadioInterferenceViewModel } from './radio-interference-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'radio-interferences-group',
    templateUrl: 'radio-interference-group.component.html',
})
export class RadioInterferenceGroupComponent extends AbstractGroupComponent<RadioInterferenceViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Radio Interference';
    }

    getControlName(): string {
        return 'radioInterferences';
    }

    getNewItemViewModel(): RadioInterferenceViewModel {
        return new RadioInterferenceViewModel();
    }
}
