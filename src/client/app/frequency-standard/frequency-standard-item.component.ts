import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
  moduleId: module.id,
  selector: 'frequency-standard-item',
  templateUrl: 'frequency-standard-item.component.html',
})
export class FrequencyStandardItemComponent extends AbstractItem implements OnInit {
  /**
   * The Frequency Standard in question.
   */
  @Input() frequencyStandard: FrequencyStandardViewModel;

  constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
    super(dialogService);
  }

    ngOnInit() {
        this.patchForm();
    }

  getItemName(): string {
    return 'Frequency Standard';
  }

    getItem(): AbstractViewModel {
        return this.frequencyStandard;
    }

    public static newFormInstance(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            standardType: [''],//, [Validators.minLength(4)]],
            inputFrequency: [''],//, [Validators.maxLength(100)]],
            startDate: [''],//, [Validators.required]],
            endDate: [''],  //  requiredIfNotCurrent="true"
            notes: [''],//, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        return itemGroup;
    }
}
