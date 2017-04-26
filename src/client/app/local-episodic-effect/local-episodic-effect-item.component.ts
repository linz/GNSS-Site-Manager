import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItem, ItemControls } from '../shared/abstract-groups-items/abstract-item';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Local Episodic Effect.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effect-item',
    templateUrl: 'local-episodic-effect-item.component.html',
})
export class LocalEpisodicEffectItemComponent extends AbstractItem implements OnInit {
    /**
     * The LocalEpisodicEffect in question.
     */
    @Input() localEpisodicEffect: LocalEpisodicEffectViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getItem(): AbstractViewModel {
        return this.localEpisodicEffect;
    }

    public static newFormInstance(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            event: [''],//, [Validators.required, Validators.minLength(100)]],
            startDate: [''],//, [Validators.required]],
            endDate: ['', []],  // requiredIfNotCurrent="true"
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        return itemGroup;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        // let itemGroup: FormGroup = formBuilder.group({
        // turn off all Validators until work out solution to 'was false now true' problem
        // TODO Fix Validators
        return new ItemControls([
            {event: new FormControl([''])},//, [Validators.required, Validators.minLength(100)]],
            {startDate: new FormControl([''])},//, [Validators.required]],
            {endDate: new FormControl(['', []])},  // requiredIfNotCurrent="true"
            {fieldMaps: new FormControl('')},
            {dateDeleted: new FormControl([''])},
            {dateInserted: new FormControl([''])},
            {deletedReason: new FormControl([''])}
        ]);
    }

}
