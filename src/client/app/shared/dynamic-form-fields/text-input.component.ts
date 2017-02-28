import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'text-input',
    templateUrl: 'text-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputComponent),
        multi: true
    }]
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() model: string;
    private _model: string = '';
    @Input() index: string = '0';
    @Input() name: string = '';
    @Input() public label: string = '';
    @Input() public required: boolean = false;
    @Input() public minlength: string = '';
    @Input() public maxlength: string = '';

    //   configurationObject: any = null;
    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    get xmodel(): string {
        return this._model;
    }

    set xmodel(value: string) {
        if (value !== undefined && value !== this._model) {
            console.log('set: ', value);
            this._model = value;
            this.propagateChange(value);
        }
    }

    writeValue(value: string) {
        if (value !== undefined && value !== this._model) {
            console.log('write value: ', value);
            this.xmodel = value;
        }
    }


    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    /* Output an event when the value in the field changes */
    //   @Output() modelChange = new EventEmitter();
    //   change(newValue:string) {
    //     this.model = newValue;
    //     this.modelChange.emit(newValue);
    //   }
}