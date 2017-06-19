import { browser, element, by } from 'protractor';

describe('SelectSite', () => {

  beforeEach(async () => {
        return await browser.get('/');
  });

  it('should have an input for siteName/fourCharacterId', () => {
    expect(element(by.css('sd-select-site input[name="searchText"]')).isPresent()).toEqual(true);
  });

  it('should have a search button', () => {
    expect(element(by.css('sd-select-site button')).isPresent()).toEqual(true);
  });

});
