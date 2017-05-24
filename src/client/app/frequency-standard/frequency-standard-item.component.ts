import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'frequency-standard-item',
    templateUrl: 'frequency-standard-item.component.html',
})
export class FrequencyStandardItemComponent extends AbstractItemComponent {
    /**
     * The Frequency Standard in question.
     */
    @Input() frequencyStandard: FrequencyStandardViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Frequency Standard';
    }

    getItem(): AbstractViewModel {
        return this.frequencyStandard;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {standardType: new FormControl('', [Validators.minLength(4)])},
            {inputFrequency: new FormControl('', [Validators.maxLength(25)])},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            {endDate: new FormControl('')},
            {notes: new FormControl('', [Validators.maxLength(2000)])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

}
