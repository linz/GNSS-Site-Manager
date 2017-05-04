import { browser, element, by } from 'protractor';

describe('Home', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should display the application title', () => {
    expect(element(by.css('sd-app span#app-title')).getText()).toEqual('GNSS Site Manager');
  });

});
