import { Component } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { FormBuilder } from '@angular/forms';

/**
 * This class represents a collection of FrequencyStandard Component.
 */
@Component({
    moduleId: module.id,
    selector: 'frequency-standard-group',
    templateUrl: 'frequency-standard-group.component.html',
})
export class FrequencyStandardGroupComponent extends AbstractGroupComponent<FrequencyStandardViewModel> {

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Frequency Standard';
    }

    getControlName(): string {
        return 'frequencyStandards';
    }

    newItemViewModel(blank?: boolean): FrequencyStandardViewModel {
        return new FrequencyStandardViewModel(blank);
    }
}
