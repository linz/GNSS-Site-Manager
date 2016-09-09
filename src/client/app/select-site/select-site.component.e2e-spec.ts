describe('SelectSite', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have an input for siteName/fourCharacterId', () => {
    expect(element(by.css('sd-select-site form input')).isPresent()).toEqual(true);
  });

  it('should have a search button', () => {
    expect(element(by.css('sd-select-site form button')).isPresent()).toEqual(true);
  });

});
