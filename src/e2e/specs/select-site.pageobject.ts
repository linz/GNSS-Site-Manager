import { element, by, ElementFinder } from 'protractor';

export class SelectSitePage {
    readonly url:string = '/';
    readonly searchBox: ElementFinder = element(by.css('sd-select-site input[name="searchText"]'));
    readonly searchButton: ElementFinder = element(by.css('sd-select-site button'));
}
