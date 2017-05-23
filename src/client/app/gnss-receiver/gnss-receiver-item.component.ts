import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This component represents a single GNSS Receiver.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receiver-item',
    templateUrl: 'gnss-receiver-item.component.html',
})
export class GnssReceiverItemComponent extends AbstractItemComponent {
    /**
     * The GnssReceiver in question.
     */
    @Input() gnssReceiver: GnssReceiverViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(userAuthService, dialogService);
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {receiverType: new FormControl('', [Validators.maxLength(25)])},
            {manufacturerSerialNumber: new FormControl('', [Validators.maxLength(4)])},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            {endDate: new FormControl('')},
            {firmwareVersion: new FormControl('', [Validators.maxLength(25)])},
            {satelliteSystem: new FormControl('', [Validators.maxLength(25)])},
            {elevationCutoffSetting: new FormControl('', [Validators.maxLength(25)])},
            {temperatureStabilization: new FormControl('', [Validators.required])}, // Validators.pattern(/^\d{1,3}$/) - works!
            {notes: new FormControl('', [Validators.maxLength(20)])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

    getItem(): AbstractViewModel {
        return this.gnssReceiver;
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }
}
