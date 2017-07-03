import { element, by, ElementFinder } from 'protractor';

export class UserRegistrationPage {
    readonly url: string = '/userRegistration';
    readonly okButton: ElementFinder = element(by.cssContainingText('button', 'OK'));
    readonly cancelButton: ElementFinder = element(by.cssContainingText('button', 'Cancel'));
    readonly firstName: ElementFinder = element(by.css('text-input[formcontrolname="firstName"] input'));
    readonly lastName: ElementFinder = element(by.css('text-input[formcontrolname="lastName"] input'));
    readonly organisation: ElementFinder = element(by.css('text-input[formcontrolname="organisation"] input'));
    readonly position: ElementFinder = element(by.css('text-input[formcontrolname="position"] input'));
    readonly phone: ElementFinder = element(by.css('text-input[formcontrolname="phone"] input'));
    readonly email: ElementFinder = element(by.css('text-input[formcontrolname="email"] input'));
    readonly remarks: ElementFinder = element(by.css('textarea-input[formcontrolname="remarks"] textarea'));
};
