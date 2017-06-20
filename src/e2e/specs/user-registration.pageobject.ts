import { element, by, ElementFinder } from 'protractor';

export class UserRegistrationPage {
    readonly url: string = '/userRegistration';
    readonly okButton: ElementFinder = element(by.cssContainingText('button', 'OK'));
    readonly cancelButton: ElementFinder = element(by.cssContainingText('button', 'Cancel'));
    readonly firstName: ElementFinder = element(by.css('sd-user-registration input[ng-reflect-name="firstName"]'));
    readonly lastName: ElementFinder = element(by.css('sd-user-registration input[ng-reflect-name="lastName"]'));
    readonly organisation: ElementFinder = element(by.css('sd-user-registration input[ng-reflect-name="organisation"]'));
    readonly position: ElementFinder = element(by.css('sd-user-registration input[ng-reflect-name="position"]'));
    readonly phone: ElementFinder = element(by.css('sd-user-registration input[ng-reflect-name="phone"]'));
    readonly email: ElementFinder = element(by.css('sd-user-registration input[ng-reflect-name="email"]'));
    readonly remarks: ElementFinder = element(by.css('sd-user-registration textarea[ng-reflect-name="remarks"]'));
};
