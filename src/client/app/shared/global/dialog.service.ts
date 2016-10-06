import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  private _alertify: any = require('alertify.js');

  /*
   * Opens a customised dialog showing the changes made and prompts the user to confirm before saving
   */
  public confirmSaveDialog(msg: string, okCallback: () => any, cancelCallback: () => any) {
    let header: string = '<div class="panel-heading pad-sm"><div class="panel-title">Confirm changes made before saving</div></div>';
    let body: string = '<div class="panel-body pad-sm">' + msg + '</div>';
    let footer: string = '<p class="footer">Do you want to save changes made?</p>';
    let msgHtml: string = '<div class="panel panel-info">' + header + body + '</div>' + footer;
    this.showConfirmDialog(msgHtml, okCallback, cancelCallback);
  }

  /*
   * Opens a confirmation dialog and acts accordingly in response to users' choice
   */
  public showConfirmDialog(message: string, okCallback: () => any, cancelCallback: () => any) {
    this._alertify.okBtn('Yes').cancelBtn('Cancel')
      .confirm(message, function (event: any) {
        event.preventDefault();
        okCallback();
      }, function(event: any) {
        event.preventDefault();
        cancelCallback();
      }
    );
  }

  /*
   * Opens a dialog prompting user to input a value for it
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

  /*
   * Displays a dialog with alert message
   */
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
