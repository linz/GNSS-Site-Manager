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
  private showDatetimePicker: boolean = false;

  @Input() public datetimeString: string = '';
  @Output() public datetimeStringChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.datetimeModel = this.convertToDateObject(this.datetimeString);
  }

  public showCalendar(): void {
    this.showDatetimePicker = true;
  }

  public setSelectedDatetime(event: any): void {
    if (this.invalidHours || this.invalidMinutes || this.invalidSeconds) {
      return;
    }
    this.showDatetimePicker = false;
    this.datetimeModel = event;
    this.datetimeModel.setHours(this.hours);
    this.datetimeModel.setMinutes(this.minutes);
    this.datetimeModel.setSeconds(this.seconds);

    this.datetimeString = this.formatDateToString(this.datetimeModel);
    this.datetimeStringChange.emit(this.datetimeString);
    console.log('Selected Date: ' + this.datetimeString);
  }

  public updateHours(): void {
    this.hours = this.toInteger(this.hoursString, 0, 23);
    if (this.hours === null) {
      this.invalidHours = true;
      this.hours = 0;
    } else {
      this.invalidHours = false;
      this.hoursString = this.padTwo(this.hours);
    }
  }

  public updateMinutes(): void {
    this.minutes = this.toInteger(this.minutesString, 0, 23);
    if (this.minutes === null) {
      this.invalidMinutes = true;
      this.minutes = 0;
    } else {
      this.invalidMinutes = false;
      this.minutesString = this.padTwo(this.minutes);
    }
  }

  public updateSeconds(): void {
    this.seconds = this.toInteger(this.secondsString, 0, 23);
    if (this.seconds === null) {
      this.invalidSeconds = true;
      this.seconds = 0;
    } else {
      this.invalidSeconds = false;
      this.secondsString = this.padTwo(this.seconds);
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
    this.hoursString = this.padTwo(this.hours);
  }

  public decrementHours(): void {
    this.hours -= 1;
    if (this.hours > 23) {
      this.hours = 0;
    } else if (this.hours < 0) {
      this.hours = 23;
    }
    this.invalidHours = false;
    this.hoursString = this.padTwo(this.hours);
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
    this.minutesString = this.padTwo(this.minutes);
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
    this.minutesString = this.padTwo(this.minutes);
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
    this.secondsString = this.padTwo(this.seconds);
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
    this.secondsString = this.padTwo(this.seconds);
  }

  /**
   * Convert a Date-time string 'YYYY-MM-DDThh:mm:ss.sssZ' to a Date object.
   */
  private convertToDateObject(dtStr: string): Date {
    if (dtStr !== null && dtStr.length >= 19) {
      console.log('Input Date: ' + dtStr.substring(0, 19));
      return new Date(dtStr.substring(0, 19));
    }
    return new Date();
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
