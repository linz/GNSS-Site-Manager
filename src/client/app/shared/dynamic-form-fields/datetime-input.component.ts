import { Component, ElementRef, HostListener, Input, OnInit, DoCheck, forwardRef, SimpleChange, OnChanges,
    ChangeDetectorRef} from '@angular/core';
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
export class DatetimeInputComponent extends AbstractGnssControls implements OnInit, DoCheck, ControlValueAccessor, OnChanges {
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

    constructor(private elemRef: ElementRef, private changeDetectionRef : ChangeDetectorRef) {
        super();
        // this._datetimeDate = new Date();
    }

    ngOnInit() {
        this.checkPreConditions();
        this.createValidators();
        super.setForm(this.form);
        // this._datetimeDate = new Date();
    }

    validate(c: FormControl): any {
        return this.validateFn(c);
    }

    ngDoCheck(): void {
        // If the @Input is changed externally, want to update the displayed date
        // if (null && this.datetimeLast !== this.datetime) {
        //     console.debug(`${this.controlName} - ngDoCheck - update this.datetimeLast (was ${this.datetimeLast}) to ${this.datetime}`)
        //     this.datetimeLast = this.datetime;
        // }
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            console.debug(`ngOnChanges - prop: ${propName}, value: ${changedProp.currentValue}`)
            // if (changedProp.isFirstChange()) {
            // if (propName === 'geodesyEvent') {
            //     this.handleGeodesyEvents();
            // }
            // }
        }
    }
    // set datetimeDisplay(dt: string) {
    //     if (null && dt !== this._datetimeDisplayLast) {
    //         this._datetimeDisplayLast = this._datetimeDisplay;
    //         this._datetimeDisplay = dt;
    //         this._datetime = this.formatDisplayToTime(dt);
    //         this.propagateChange(this._datetime);
    //     }
    // }
    //
    // get datetimeDisplay() {
    //     return this._datetimeDisplay;
    // }

    // TODO - needs fixing to handle TimeZones
    set datetime(dt: string) {
        if (dt !== this._datetime) {
            // The datePicker sets its ngModel to formats like 'Sun 24th may 2016' or the like.  Convert.
            // let d: Date = new Date(dt);
            // d.setTime(dt);
            let dateString: string = MiscUtils.formatDateToDatetimeString(new Date(dt));
            // let d2: string = '2000-08-23T00:00:00.000Z';
            // this._datetimeLast = dt;    //this._datetime;
            this._datetime = dateString;
            // this._datetimeDate = d;
            console.debug(`${this.controlName} - set datetime - set to ${dateString} from ${dt} string`)
            // this._datetimeDisplay = DatetimeInputComponent.formatTimeToDisplay(dt);
            // this.datetimeModel = new Date();
            this.propagateChange(this._datetime);
            // this.form.markAsTouched();//markAsTouched();// patchValue({controlName: this._datetime});
            // this.updateCalendar();
            // console.debug(`${this.controlName} - END set datetime - set to ${dt} - _datetimeLast is ${this._datetimeLast}`)
        } else {
            console.debug(`${this.controlName} - set datetime - not setting as same`);
        }

    }

    get datetime(): string {
        // console.debug(`${this.controlName} - get dateTime: ${this._datetime}`);
        return this._datetime;
    }

    /**
     * Initialize relevant variables when the directive is instantiated
     */

    /* Methods for Model-based forms - implement ControlValueAccessor */

    writeValue(value: string) {
        if (value) {
            // console.debug(`${this.controlName} - writeValue ${value} - _datetime is ${this._datetime}`)
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

    /**
     * Update the calendar and datetime model in response to direct changes made in the input box
     */
    /*    public updateCalendar(): void {
     let newDate: Date = this.convertStringToDate(this.datetimeDisplay);
     if (newDate === null) {
     this.datetimeModel = new Date();
     } else {
     this.datetimeModel = newDate;
     }
     this.hours = this.datetimeModel.getHours();
     this.minutes = this.datetimeModel.getMinutes();
     this.seconds = this.datetimeModel.getSeconds();
     this.updateTimeStrings();
     }

     public updateHours(): void {
     this.hours = this.toInteger(this.hoursString, 0, 23);
     if (this.hours === null) {
     this.invalidHours = true;
     this.hours = 0;
     } else {
     this.invalidHours = false;
     this.updateTimeStrings();
     }
     }

     public updateMinutes(): void {
     this.minutes = this.toInteger(this.minutesString, 0, 59);
     if (this.minutes === null) {
     this.invalidMinutes = true;
     this.minutes = 0;
     } else {
     this.invalidMinutes = false;
     this.updateTimeStrings();
     }
     }

     public updateSeconds(): void {
     this.seconds = this.toInteger(this.secondsString, 0, 59);
     if (this.seconds === null) {
     this.invalidSeconds = true;
     this.seconds = 0;
     } else {
     this.invalidSeconds = false;
     this.updateTimeStrings();
     }
     }*/

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

    /*       this.hours += 1;
     if (this.hours > 23) {
     this.hours = 0;
     } else if (this.hours < 0) {
     this.hours = 23;
     }
     this.invalidHours = false;
     this.updateTimeStrings();
     }

     public decrementHours(): void {
     this.hours -= 1;
     if (this.hours > 23) {
     this.hours = 0;
     } else if (this.hours < 0) {
     this.hours = 23;
     }
     this.invalidHours = false;
     this.updateTimeStrings();
     }

     public incrementMinutes(): void {
     this.minutes += 1;
     if (this.minutes > 59) {
     this.minutes = 0;
     this.incrementHours();
     } else if (this.minutes < 0) {
     this.minutes = 59;
     this.decrementHours();
     }
     this.invalidMinutes = false;
     this.updateTimeStrings();
     }

     public decrementMinutes(): void {
     this.minutes -= 1;
     if (this.minutes > 59) {
     this.minutes = 0;
     this.incrementHours();
     } else if (this.minutes < 0) {
     this.minutes = 59;
     this.decrementHours();
     }
     this.invalidMinutes = false;
     this.updateTimeStrings();
     }

     public incrementSeconds(): void {
     this.seconds += 1;
     if (this.seconds > 59) {
     this.seconds = 0;
     this.incrementMinutes();
     } else if (this.seconds < 0) {
     this.seconds = 59;
     this.decrementMinutes();
     }
     this.invalidSeconds = false;
     this.updateTimeStrings();
     }

     public decrementSeconds(): void {
     this.seconds -= 1;
     if (this.seconds > 59) {
     this.seconds = 0;
     this.incrementMinutes();
     } else if (this.seconds < 0) {
     this.seconds = 59;
     this.decrementMinutes();
     }
     this.invalidSeconds = false;
     this.updateTimeStrings();
     }*/

    public isRequired() : boolean {
        return this.required || (this.requiredIfNotCurrent && this.index[0] !== 0);
    }

    public closeDatetime() {
        this.showDatetimePicker = false;
    }
    /**
     * Update hour/minute/second time strings in response to any changes in hours, minutes, and seconds.
     */
    // private updateTimeStrings() {
    //     this.hoursString = this.padTwo(this.hours);
    //     this.minutesString = this.padTwo(this.minutes);
    //     this.secondsString = this.padTwo(this.seconds);
    // }

    /**
     * Convert a string in format of 'YYYY-MM-DDThh:mm:ss.sssZ' to a Date object.
     */
    // private convertStringToDate(dtStr: string): Date {
    //     if (dtStr === null || dtStr.trim().length === 0) {
    //         return null;
    //     } else if (dtStr.trim().length < 19) {
    //         return null;
    //     }
    //
    //     try {
    //         let date: Date = new Date(dtStr.substring(0, 19).replace(' ', 'T'));
    //         if (date !== null && date.toString() !== 'Invalid Date') {
    //             return date;
    //         }
    //     } catch(error) {
    //         console.log('Error:'+error);
    //     }
    //
    //     return null;
    // }

    // private formatDisplayToTime(displayStr: string): string {
    //     let datetime = '';
    //     if (displayStr !== null) {
    //         datetime = displayStr.replace(' ', 'T');
    //         if (displayStr.match(validDisplayFormat)) {
    //             datetime += defaultTZms;
    //         }
    //     }
    //     return datetime;
    // }

    private isaDate(date: Date): boolean {
        if ( Object.prototype.toString.call(date) === "[object Date]" ) {
            // it is a date
            if ( isNaN( date.getTime() ) ) {  // d.valueOf() could also work
                // date is not valid
                return false;
            }
            else {
                // date is valid
                return true;
            }
        }
        else {
            // not a date
            return false;
        }
    }

    /**
     * Emit a string in format of 'YYYY-MM-DDThh:mm:ss.sssZ' back to the input JSON object.
     */
    // private emitOutputDatetime(): void {
    //     if (this.datetimeModel === null) {
    //         return;
    //     }
    //
    //     let dateStr: string = this.datetimeModel.getFullYear() + '-'
    //         + this.padTwo(this.datetimeModel.getMonth() + 1) + '-'
    //         + this.padTwo(this.datetimeModel.getDate());
    //     let timeStr: string = this.padTwo(this.datetimeModel.getHours()) + ':'
    //         + this.padTwo(this.datetimeModel.getMinutes()) + ':'
    //         + this.padTwo(this.datetimeModel.getSeconds());
    //
    //     this.datetimeDisplay = dateStr + ' ' + timeStr;
    //     this.datetimeLast = this.datetime;
    //     this.datetime = dateStr + 'T' + timeStr + defaultTZms;
    // }

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

