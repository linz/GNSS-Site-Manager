import { browser, element, by } from 'protractor';
import { SelectSitePage } from './select-site.pageobject';

describe('SelectSite', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should have an input for siteName/fourCharacterId', () => {
        expect(selectSitePage.searchBox.isPresent()).toEqual(true);
    });

    it('should have a search button', () => {
        expect(selectSitePage.searchButton.isPresent()).toEqual(true);
    });
});
