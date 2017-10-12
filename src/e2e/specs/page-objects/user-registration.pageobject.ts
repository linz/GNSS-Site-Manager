import { element, by, ElementFinder } from 'protractor';

export class UserRegistrationPage {
    readonly url: string = '/userRegistration';
    readonly okButton: ElementFinder = element(by.cssContainingText('button', 'OK'));
    readonly cancelButton: ElementFinder = element(by.cssContainingText('button', 'Cancel'));
    readonly firstName: ElementFinder = element(by.css('text-input[controlname="firstName"] input'));
    readonly lastName: ElementFinder = element(by.css('text-input[controlname="lastName"] input'));
    readonly organisation: ElementFinder = element(by.css('text-input[controlname="organisation"] input'));
    readonly position: ElementFinder = element(by.css('text-input[controlname="position"] input'));
    readonly phone: ElementFinder = element(by.css('text-input[controlname="phone"] input'));
    readonly email: ElementFinder = element(by.css('email-input[controlname="email"] input'));
    readonly remarks: ElementFinder = element(by.css('textarea-input[controlname="remarks"] textarea'));
}
