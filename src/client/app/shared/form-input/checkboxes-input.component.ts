import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'checkboxes-input',
    templateUrl: 'checkboxes-input.component.html',
    styleUrls: ['form-input.component.css']
})
export class CheckboxesInputComponent extends AbstractInput implements OnInit {
    @Input() options: string[] = [];
    @Input() separator: string = '+';
    public selections: string[] = [];
    public errors: string = '';

    constructor() {
        super();
    }

   /**
    * Initialize relevant variables when the directive is instantiated
    */
    ngOnInit() {
        super.ngOnInit();
        this.parseInputOptions();
        this.addValidatorsToFormControl();
    }

    protected addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }

    protected updateCheckedOptions(option: string, event: any) {
        let isChecked: boolean = event.target.checked;
        if (isChecked) {
            this.selections.push(option);
        } else {
            let index: number = this.selections.indexOf(option);
            if (index !== -1) {
                this.selections.splice(index, 1);
            }
        }
        this.formControl.markAsDirty();
        this.formControl.setValue(this.selections);
    }

    protected isChecked(option: string): boolean {
        return this.selections.indexOf(option) >= 0;
    }

    private parseInputOptions(): void {
        if (!this.options || this.options.length === 0) {
            this.errors = 'Error: must provide a full list of satellite systems supported.';
            return;
        }

        let unknownValues: string[] = [];
        this.selections = this.formControl.value ? this.formControl.value : [];
        this.selections.forEach((item: string) => {
            if (this.options.indexOf(item) === -1) {
                unknownValues.push(item);
            }
        });

        if (unknownValues && unknownValues.length > 0) {
            this.errors = 'Unknown input value' + (unknownValues.length > 1 ? 's' : '') +': ' + unknownValues.join(', ');
        }
    }
}
