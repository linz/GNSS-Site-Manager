import { Component, ElementRef, HostListener, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';
import { MiscUtils } from '../index';

const defaultTZms: string = '.000Z';
const validDisplayFormat: RegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/g;

/**
 * Validator to apply in the model based form in the .ts file.  This validates that the form is correct.
 */
export function dateTimeFormatValidator(control: FormControl): { [s: string]: any } {
    let value: string = control.value;

    // Unfortunately the value displayed and the value on the FormControl are different
    // So need to validate what the user seees by reformatting here
    let displayFormattedValue: string = DatetimeInputComponent.formatTimeToDisplay(value, true);
    let formatStringMsg: string = 'Format: YYYY-MM-DD hh:mm:ss';

    console.debug('dateTimeFormatValidator - in:  ', displayFormattedValue);
    if (displayFormattedValue && (displayFormattedValue.length === 0 || displayFormattedValue.match(validDisplayFormat))) {
        // Use a Validator.required if needed
        return null;
    } else {
        return { 'incorrect format': formatStringMsg };
    }
}

/**
 * Validator to apply in the model based form in the .ts file.  This validates that if the item isn't index=0 (ie. an older one)
 * then it is required.
 */
export function createDateTimeRequiredIfNotCurrentValidator(index: number) {
    return function dateTimeRequiredIfNotCurrentValidator(control: FormControl): { [s: string]: any } {
        let value: string = control.value;

        if ((! value || value.length === 0) && index > 0) {
            //return { 'required as not latest': true };
            // Temp turn off validation until can work out why validation errors on loading cause problem
            return null;
        } else {
            return null;
        }
    };
}

/**
 * This class represents the DatetimeInputComponent for choosing dates.
 * TODO - Remove display logic by moving to directive - see
 * https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976#.g3wkqhvrk
 *
 * TODO - Alternatively change view model to be our current DateTime Display format and then map in View -> Data models translate
 */
@Component({
    moduleId: module.id,
    selector: 'datetime-input',
    templateUrl: 'datetime-input.component.html',
    styleUrls: ['datetime-input.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatetimeInputComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatetimeInputComponent), multi: true }
        // { provide: NG_VALIDATORS, useValue: dateTimeValidator, multi: true }
    ]
})
export class DatetimeInputComponent extends AbstractGnssControls implements OnInit, ControlValueAccessor {
    @Input() name: string = 'Date';
    @Input() required: boolean = false;
    @Input() requiredIfNotCurrent: boolean = false;
    @Input() label: string = '';
    @Input() public index: any = 0;
    // controlName & form needed for validation
    @Input() form: FormGroup;
    @Input() controlName: string;

    public _datetime: string = '';
    public showDatetimePicker: boolean = false;

    public miscUtils: any = MiscUtils;

    isFormDisabled(): boolean {
        return this.form.disabled;
    }

    static formatTimeToDisplay(dateStr: string, returnAsIsUponFailure: boolean = false): string {
        let datetimeDisplay: string = '';
        if (dateStr !== null) {
            datetimeDisplay = dateStr.replace('T', ' ');    // .substring(0, 19)
            datetimeDisplay = datetimeDisplay.replace(/\.\d\d\dZ/, ''); // Milliseconds <TimeZone = Z>
        } else {
            if (returnAsIsUponFailure) {    // TODO THIS NO LONGER NEEDED
                return dateStr;
            }
        }
        return datetimeDisplay;
    }

    public propagateChange: Function = (_: any) => { };
    public propagateTouch: Function = () => { };
    public validateFn: Function = () => { };

    constructor(private elemRef: ElementRef) {
        super();
    }

    ngOnInit() {
        this.checkPreConditions();
        this.createValidators();
        super.setForm(this.form);
    }

    validate(c: FormControl): any {
        return this.validateFn(c);
    }

    // TODO - needs fixing to handle TimeZones
    set datetime(dt: string) {
        if (dt !== this._datetime) {
            // The datePicker sets its ngModel to formats like 'Sun 24th may 2016'.  Convert.
            // let d: Date = new Date(dt);
            // d.setTime(dt);
            let dateString: string = MiscUtils.formatDateToDatetimeString(new Date(dt));
            // let d2: string = '2000-08-23T00:00:00' + defaultTZms;
            // this._datetimeLast = dt;    //this._datetime;
            this._datetime = dateString;
            console.debug(`${this.controlName} - set datetime - set to ${dateString} from ${dt} string`)
            this.propagateChange(this._datetime);
            // this.updateCalendar();
        } else {
            console.debug(`${this.controlName} - set datetime - not setting as same`);
        }

    }

    get datetime(): string {
        return this._datetime;
    }

    /* ControlValueAccessor Methods */

    writeValue(value: string) {
        if (value) {
            this.datetime = value;
        }
    }

    registerOnChange(fn: (_: any) => void): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.propagateTouch = fn;
    }

    setDisabledState(isDisabled: boolean) : void {
        console.log('DatetimeInputComponent - setDisabledState - ',isDisabled);
        // implement this?
    }

    /**
     * Close the calendar if mouse clicks outside of it
     */
    @HostListener('document:click', ['$event'])
    public handleClickOutside(event: any) {
        if (this.showDatetimePicker) {
            event.preventDefault();
            let clickedComponent: any = event.target;
            let isInside: boolean = false;
            do {
                if (clickedComponent === this.elemRef.nativeElement) {
                    isInside = true;
                    break;
                } else if (clickedComponent.id && clickedComponent.id.startsWith('datepicker')) {
                    isInside = true;
                    break;
                } else if (clickedComponent.type && clickedComponent.type === 'button'
                    && clickedComponent.tabIndex && clickedComponent.tabIndex === -1) {
                    isInside = true;
                    break;
                }
                clickedComponent = clickedComponent.parentNode;
            } while (clickedComponent);

            this.showDatetimePicker = isInside;
        }
    }

    // TODO - put these back in place.  Currently the buttons just close the dialog.
    /**
     * Set the selected datetime value to the datetime model when users click on the OK button
     */
    // public setSelectedDatetime(): void {
    //     if (this.invalidHours || this.invalidMinutes || this.invalidSeconds) {
    //         return;
    //     }
    //
    //     this.showDatetimePicker = false;
    //     this.datetimeModel.setHours(this.hours);
    //     this.datetimeModel.setMinutes(this.minutes);
    //     this.datetimeModel.setSeconds(this.seconds);
    //     this.emitOutputDatetime();
    //     this.hasChanges = true;
    // }

    /**
     * Cancel the selected datetime value and close the popup
     */
    // public cancelSelectedDatetime(event: any): void {
    //     this.updateCalendar();
    //     this.showDatetimePicker = false;
    // }

    public closeDatetime() {
        this.showDatetimePicker = false;
    }

    /**
     * Update the datetime model when users select a date on calendar
     */
    public updateDate(event: any): void {
        // TODO - fix time zone handling.  The DateTime widget will correct the date string to local timezone.
        // TODO - I've been trying to mess around with forcing to Z / UTC but DateTime assumes local timezone.
        // TODO - To prevent TZ problem use something like moment and moment-timezone
        // TODO - Also see 'set datetime()' above.
        let d: string = String(event);
        this.datetime = d.replace(/ *(([\w:]+ +){1,6})(.*)/, "$1GMT+0000 (UTC)");
        // let d: Date = new Date(String(event));
        // // date defaults to local time zone.  The dates we choose are UTC so do the convert.
        // let dateInStr: string = d.toString();
        // // format of date string is ' Mon Sep 28 1998 14:36:22 GMT-0700 (PDT)'
        // console.debug(`dateString is ${dateInStr}`);
        // // dateInStr = dateInStr.replace(/ *(([\w:]+ +){1,6})(.*)/, "$1GMT+0 (UTC)");
        // console.debug(`dateString after replace is ${dateInStr}`);
        // // let dateUTC: Date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds()));
        // this.datetime = MiscUtils.formatDateToDatetimeString(d);
        // // No what I've done doesnt work - you can't force a TZ - it is always
        // console.debug(`updateDate to str: ${dateInStr}, date: ${d} - dateTime is now: ${this.datetime}`);
    }

    // TODO - can't get time working properly until sort out TimeZones
    public getHours(): number {
        let d: Date = new Date(this.datetime);
        return d.getHours();
    }

    public getMinutes(): number {
        let d: Date = new Date(this.datetime);
        return d.getMinutes();
    }

    public getSeconds(): number {
        let d: Date = new Date(this.datetime);
        return d.getSeconds();
    }

    public incrementHours(): void {
        let d: Date = new Date(this.datetime);
        let hours: number = d.getHours();
        hours++;
        if (hours > 23) {
            hours = 0;
        } else if (hours < 0) {
            hours = 23;
        }
        d.setHours(hours);
        this.datetime = MiscUtils.formatDateToDatetimeString(d);
        console.debug(`incrementHours to ${d} - dateTime is now: ${this.datetime}`);
    }

    public decrementHours(): void {
        let d: Date = new Date(this.datetime);
        let hours: number = d.getHours();
        hours--;
        if (hours > 23) {
            hours = 0;
        } else if (hours < 0) {
            hours = 23;
        }
        d.setHours(hours);
        this.datetime = MiscUtils.formatDateToDatetimeString(d);
        console.debug(`incrementHours to ${d} - dateTime is now: ${this.datetime}`);
    }

    public isRequired() : boolean {
        return this.required || (this.requiredIfNotCurrent && this.index[0] !== 0);
    }

    private checkPreConditions() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('DatetimeInputComponent - controlName Input is required');
        }
        if (!this.form) {
            console.error('DatetimeInputComponent - form Input is required');
        }
    }

    /**
     * Validators with closures need to be created based on @Input attributes.  Others can be set in the Model form in the .ts.
     */
    private createValidators() {
        if (this.requiredIfNotCurrent === true && this.index > 0 ) {
            throw new Error('DatetimeInputComponent - requiredIfNotCurrent Input requires an index input');
        }
        this.validateFn = createDateTimeRequiredIfNotCurrentValidator(this.index);
    }
}

