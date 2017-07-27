import { browser } from 'protractor';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { TestUtils } from '../utils/test.utils';
import * as _ from 'lodash';

describe('SiteLog', () => {
    let siteUrl: string = '/siteLog/ADE1';
    let siteLogPage: SiteLogPage = new SiteLogPage();

    beforeEach(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        return await browser.get(siteUrl);
    });

    it('expect ade1 sitelog to exist', () => {
        expect(siteLogPage.siteInformationHeader.isPresent()).toBeTruthy('expect ade1 sitelog\'s SiteIdentification Header to exist');
    });

    it('expect all level 1 headers to be present', () => {
        let allHeaders: string[] = null;
        let expectedHeaders: string[] = ['Site Information', 'GNSS Receivers', 'GNSS Antennas', 'Surveyed Local Ties',
            'Frequency Standards', 'Collocation Information', 'Local Episodic Effects', 'Humidity Sensors', 'Pressure Sensors',
            'Temperature Sensors', 'Water Vapor Sensors', 'Radio Interferences', 'Signal Obstructions', 'Multipath Sources'];

        TestUtils.getElementArrayAsList(siteLogPage.siteGroupHeaders).then((groupHeaders: string[]) => {
            allHeaders = groupHeaders;
            console.log('SiteLog / expect all level 1 headers to be present - headers: ', allHeaders);
            expect(allHeaders.length).toBe(expectedHeaders.length);
            expect(_.difference(allHeaders, expectedHeaders).length).toBe(0, 'SiteLog / expect all level 1 headers to be present');
        });
    });

    it('walk and expand all Group headers', () => {
        // This test will mainly consist of expecting no error to occur that would fail the text
        siteLogPage.siteGroupHeaders.then((elements) => {
            elements.forEach((element) => {
                element.getText().then((text) => {
                    console.log('click group header: ', text);
                });
                element.click();
                browser.waitForAngular();
                element.click();    // close the Group
                // No error must have occurred
            });
        });
        expect(true).toBeTruthy('If this statement was reached then it should succeed.  If failed then something weird happened.');
    });

    it('walk and expand all Group and Item headers', () => {
        // This test will mainly consist of expecting no error to occur that would fail the text
        siteLogPage.siteGroupHeaders.then((elements) => {
            elements.forEach((element) => {
                element.getText().then((text) => {
                    console.log('click group header: ', text);
                });
                element.click();

                siteLogPage.siteItemHeaders.then((elements) => {
                    elements.forEach((element) => {
                        element.isPresent().then((isPresent) => {
                            if (isPresent) {
                                element.getText().then((text) => {
                                    console.log('    click item header: "'+ text+'"');
                                    element.click();
                                    browser.waitForAngular();
                                    element.click();
                                    browser.waitForAngular();
                                });
                            }
                        });
                    });
                });
                element.click();    // close the Group
                // No error must have occurred
            });
        });
        expect(true).toBeTruthy('If this statement was reached then it should succeed.  If failed then something weird happened.');
    });
});
