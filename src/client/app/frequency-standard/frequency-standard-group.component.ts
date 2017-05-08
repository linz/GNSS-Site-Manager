import { Component, Input } from '@angular/core';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group';
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
    @Input() frequencyStandards: any;

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.frequencyStandards);
            this.setupForm('frequencyStandards');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.frequencyStandards);
        }
    }

    static compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Frequency Standard';
    }

    compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
        return FrequencyStandardGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): FrequencyStandardViewModel {
        return new FrequencyStandardViewModel(blank);
    }
}
