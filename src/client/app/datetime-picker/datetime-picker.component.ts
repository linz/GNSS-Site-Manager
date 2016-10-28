import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'datetime-picker',
  templateUrl: 'datetime-picker.component.html',
  styleUrls: ['datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {
  public datetimeModel: Date;
  private hours: number = 0;
  private minutes: number = 0;
  private seconds: number = 0;
  private hoursString: string = '00';
  private minutesString: string = '00';
  private secondsString: string = '00';
  private invalidHours: boolean = false;
  private invalidMinutes: boolean = false;
  private invalidSeconds: boolean = false;
  private invalidDatetime: boolean = false;
  private showDatetimePicker: boolean = false;

  @Input() public required: boolean = true;
  @Input() public datetime: string = '';
  @Output() public datetimeChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    let inputDate: Date = this.convertToDateObject(this.datetime);
    if (inputDate !== null) {
      this.datetimeModel = inputDate;
    } else {
      this.datetimeModel = new Date();
    }
  }

  public showCalendar(): void {
    this.showDatetimePicker = true;
  }

  public setSelectedDatetime(event: any): void {
    if (this.invalidHours || this.invalidMinutes || this.invalidSeconds) {
      return;
    }

    this.datetimeModel = event;
    this.datetimeModel.setHours(this.hours);
    this.datetimeModel.setMinutes(this.minutes);
    this.datetimeModel.setSeconds(this.seconds);
    this.datetime = this.formatDateToString(this.datetimeModel);
    this.datetimeChange.emit(this.datetime);
    this.showDatetimePicker = false;
    this.invalidDatetime = false;
  }

  public updateCalendar(): void {
    let newDate: Date = this.convertToDateObject(this.datetime);
    if (newDate !== null) {
      this.datetimeModel = newDate;
      this.hours = this.datetimeModel.getHours();
      this.hoursString = this.padTwo(this.hours);
      this.minutes = this.datetimeModel.getMinutes();
      this.minutesString = this.padTwo(this.minutes);
      this.seconds = this.datetimeModel.getSeconds();
      this.secondsString = this.padTwo(this.seconds);
      this.invalidDatetime = false;
    }
  }

  public updateHours(): void {
    this.hours = this.toInteger(this.hoursString, 0, 23);
    if (this.hours === null) {
      this.invalidHours = true;
      this.hours = 0;
    } else {
      this.invalidHours = false;
      this.updateTime();
    }
  }

  public updateMinutes(): void {
    this.minutes = this.toInteger(this.minutesString, 0, 23);
    if (this.minutes === null) {
      this.invalidMinutes = true;
      this.minutes = 0;
    } else {
      this.invalidMinutes = false;
      this.updateTime();
    }
  }

  public updateSeconds(): void {
    this.seconds = this.toInteger(this.secondsString, 0, 23);
    if (this.seconds === null) {
      this.invalidSeconds = true;
      this.seconds = 0;
    } else {
      this.invalidSeconds = false;
      this.updateTime();
    }
  }

  public incrementHours(): void {
    this.hours += 1;
    if (this.hours > 23) {
      this.hours = 0;
    } else if (this.hours < 0) {
      this.hours = 23;
    }
    this.invalidHours = false;
    this.updateTime();
  }

  public decrementHours(): void {
    this.hours -= 1;
    if (this.hours > 23) {
      this.hours = 0;
    } else if (this.hours < 0) {
      this.hours = 23;
    }
    this.invalidHours = false;
    this.updateTime();
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
    this.updateTime();
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
    this.updateTime();
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
    this.updateTime();
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
    this.updateTime();
  }

  public validateDatetime(): void {
    if (this.datetime === null || this.datetime.trim().length === 0) {
      if (this.required) {
        this.invalidDatetime = true;
      } else {
        this.invalidDatetime = false;
      }
    } else if (this.datetime.length < 19) {
      this.invalidDatetime = true;
    } else {
      if (!this.datetime.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])T([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d).?\d{0,3}Z$/g)) {
        this.invalidDatetime = true;
      } else {
        this.invalidDatetime = false;
      }
    }
  }

  private updateTime() {
    this.hoursString = this.padTwo(this.hours);
    this.minutesString = this.padTwo(this.minutes);
    this.secondsString = this.padTwo(this.seconds);
    this.datetimeModel.setHours(this.hours);
    this.datetimeModel.setMinutes(this.minutes);
    this.datetimeModel.setSeconds(this.seconds);
    this.datetime = this.formatDateToString(this.datetimeModel);
    this.datetimeChange.emit(this.datetime);
  }

  /**
   * Convert a Date-time string 'YYYY-MM-DDThh:mm:ss.sssZ' to a Date object.
   */
  private convertToDateObject(dtStr: string): Date {
    this.validateDatetime();
    try {
      let date: Date = new Date(dtStr.substring(0, 19));
      if (date !== null && date.toString() !== 'Invalid Date') {
        return date;
      }
    } catch(error) { /*Do nothing*/ }
    return null;
  }

  /**
   * Format a Date object to a Date-time string in format of 'YYYY-MM-DDThh:mm:ss.sssZ'.
   */
  private formatDateToString(date: Date): string {
    if (date === null) {
      return '';
    }
    return date.getFullYear() + '-' + this.padTwo(date.getMonth() + 1) + '-' + this.padTwo(date.getDate())
            + 'T' + this.hoursString + ':' + this.minutesString + ':' + this.secondsString + '.000' + 'Z';
  }

  /**
   * Returns an integer between min and max values by parsing from input str,
   * return null if it is not a number or out of range.
   */
  private toInteger(str: string, min: number, max: number): number {
    try {
      let num: number = parseInt(str, 10);
      if (isNaN(num)) {
        return null;
      } else if (num < min || num > max) {
        return null;
      } else {
        return num;
      }
    } catch(error) {
      return null;
    }
  }

  /**
   * Convert an integer to a two-character string.
   */
  private padTwo(index: number): string {
    if (index < 10) {
      return '0' + index.toString();
    }
    return index.toString();
  }
}
