import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { FormBuilder } from '@angular/forms';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents a collection of FrequencyStandard Component.
 */
@Component({
    moduleId: module.id,
    selector: 'frequency-standard-group',
    templateUrl: 'frequency-standard-group.component.html',
})
export class FrequencyStandardGroupComponent extends AbstractGroupComponent<FrequencyStandardViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Frequency Standard';
    }

    getControlName(): string {
        return 'frequencyStandards';
    }

    newItemViewModel(): FrequencyStandardViewModel {
        return new FrequencyStandardViewModel();
    }
}
