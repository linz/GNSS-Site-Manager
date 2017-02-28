import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { DialogService } from '../shared/index';

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
        this.setupForm();
        this.patchForm();
    }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
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
        console.log('Freq Std - setup Form for item index: ', this.index);
        this.groupArray.push(this.itemGroup);
    }

    protected patchForm() {
        this.itemGroup.setValue(this.frequencyStandard);
        // console.log('Freq Std - patch Form for index: '+this.index+' with endDate value: ', this.frequencyStandard.endDate);
        // console.log('Freq Std - patch Form - form endDate now: ', this.itemGroup.controls['endDate'].value);
    }

  getItemName(): string {
    return 'Frequency Standard';
  }
}
