import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  private _alertify: any = require('alertify.js');

  /*
   * Opens a confirmation dialog using the alertify.js lib
   */
  public showConfirmDialog(message: string, okCallback: () => any) {
    let that: any = this;
    this._alertify
      .okBtn('Yes')
      .cancelBtn('Cancel')
      .confirm(message, function (event: any) {
        event.preventDefault();
        okCallback();
      }, function(event: any) {
        event.preventDefault();
      });
  }

  /*
   * Opens a confirmation dialog with an input field
   */
  public showPromptDialog(message: string, okCallback: () => any) {
    let that: any = this;
    this._alertify.defaultValue('Default Value').prompt(message,
      function (value: any, event: any) {
        event.preventDefault();
        that.showSuccessMessage('You clicked OK and typed: ' + value);
      }, function(event: any) {
        event.preventDefault();
        that.showLogMessage('You clicked Cancel');
      }
    );
  }

  public showAlertDialog(message: string) {
    this._alertify.alert(message);
  }

  /*
   * Displays a success/yes message in green color for 10 seconds at the bottom-left corner
   */
  public showSuccessMessage(message: string) {
    this._alertify.maxLogItems(1).closeLogOnClick(true).success(message);
  }

  /*
   * Displays an error/no message in red color for 10 seconds at the bottom-left corner
   */
  public showErrorMessage(message: string) {
    this._alertify.maxLogItems(1).closeLogOnClick(true).error(message);
  }

  /*
   * Displays an log message in black color for 10 seconds at the bottom-left corner
   */
  public showLogMessage(message: string) {
    this._alertify.maxLogItems(1).closeLogOnClick(true).log(message);
  }

}
