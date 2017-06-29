import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';
import { MultipathSourceViewModel } from './multipath-source-view-model';

/**
 * This component represents a single Pressure Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'multipath-source-item',
    templateUrl: 'multipath-source-item.component.html',
})
export class MultipathSourceItemComponent extends AbstractItemComponent {
    /**
     * The RadioInterference in question.
     */
    @Input() multipathSource: MultipathSourceViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Multipath Source';
    }

    getItem(): AbstractViewModel {
        return this.multipathSource;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {id: new FormControl(null)},
            {possibleProblemSource: new FormControl('', [Validators.maxLength(100)])},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            {endDate: new FormControl('')},
            {notes: new FormControl('', [Validators.maxLength(2000)])},
            {objectMap: new FormControl('')},
        ]);
    }

}
