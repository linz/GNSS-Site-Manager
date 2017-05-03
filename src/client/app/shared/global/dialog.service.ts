import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  private _alertify: any = require('alertify.js');

  /*
   * Opens a customised dialog showing the changes made and prompts the user to confirm before saving
   */
  public confirmSaveDialog(okCallback: () => any, cancelCallback: () => any) {
    let title: string = '<div class="title">Confirmation</div>';
    let body: string = '<p class="footer">Do you want to save all changes made?</p>';
    let message: string = '<div>' + title + body + '</div>';
    this.showConfirmDialog(message, okCallback, cancelCallback);
  }

  /*
   * Opens a customised dialog asking user whether to close/exit a page without saving changes made
   *
   * TODO: Update it to return a Promise<boolean> once alertify.org resolves this issue on its GitHub.
   *       https://github.com/alertifyjs/alertify.js
   */
  public confirmCloseDialog(msg: string, okCallback: () => any, cancelCallback: () => any) {
    let header: string = '<div class="title">Confirm Closing Page</div>';
    let body: string = '<div class="body"><p/><p>' + msg + '</p><p/></div>';
    let footer: string = '<p class="footer">Do you really want to close the page?</p>';
    let msgHtml: string = '<div>' + header + body + footer + '</div>';
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
   * Opens a notification dialog.
   */
  public showNotificationDialog(message: string, okCallback: () => void) {
    this._alertify.alert(message, (event: any) => {
      okCallback();
    });
  }

  /*
   * Opens a dialog to confirm deleting a record.
   * The record type (from getItemName()) must be supplied,
   * along with callbacks to handle the "Delete" and "Cancel" buttons.
   * calls the showDeletePromptDialog with a default message.
   */
  public confirmDeleteDialog(recordType: string, okCallback: (reason: string) => any, cancelCallback: () => any) : string {
    let title: string = '<div class="title">Deletion Reason</div>';
    let body: string = '<p class="body">Please enter a reason for deleting the ' + recordType + '</p>';
    let note: string = '<p class="note">NOTE: Changes will not be saved until the "Save" button on the top header is clicked.</p>';
    let msgHtml: string = '<div>' + title + body + note + '</div>';

    return this.showDeletePromptDialog(msgHtml, okCallback, cancelCallback);
  }

  /*
   * Opens a dialog prompting user to input a value for the reason for deleting a record.
   * Handles very basic validation of the input message: if no message supplied
   * adds an error message and redisplays the dialog.
   */
  public showDeletePromptDialog(msgHtml: string, okCallback: (reason : string) => any, cancelCallback: () => any) : string {
    return this._alertify.okBtn('OK').cancelBtn('Cancel')
    .prompt(msgHtml, (deleteReason : string, event: any) => {
      event.preventDefault();
      if (deleteReason) {
          return okCallback(deleteReason);
      } else {
          if (msgHtml.indexOf('error') === -1) {
            msgHtml = msgHtml + '<div class="error">Reason is required. Please enter a reason.</div>';
          }
          return this.showDeletePromptDialog(msgHtml, okCallback, cancelCallback);
      }
    }, (event: any) => {
      event.preventDefault();
      return cancelCallback();
    });
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
