import { ReflectiveInjector } from '@angular/core';

import { JsonixService } from './jsonix.service';

export function main() {
  describe('JsonIx Service', () => {
    let jsonIxService: JsonixService;

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonixService,
      ]);
      jsonIxService = injector.get(JsonixService);
    });

    it('should be defined', () => {
      expect(JsonixService.WS_URL).not.toBeNull();
    });

    it('should parse valid GeodesyML', () => {
      let geodesyml: string = `<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.3"
 xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.3"
 xmlns:gml="http://www.opengis.net/gml/3.2"
 xmlns:ns9="http://www.w3.org/1999/xlink"
 xmlns:gmd="http://www.isotc211.org/2005/gmd"
 xmlns:gmx="http://www.isotc211.org/2005/gmx" 
 xmlns:om="http://www.opengis.net/om/2.0" xmlns:gco="http://www.isotc211.org/2005/gco" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" gml:id="GeodesyMLType_20">
<geo:siteLog></geo:siteLog>
</geo:GeodesyML>`;
      let json: string = jsonIxService.geodesyMlToJson(geodesyml);
      expect(json).not.toBeNull();
    });

    it('should parse valid Json', () => {
      let json: string = `{"geo:siteLog":{"TYPE_NAME":"GEODESYML_0_3.SiteLogType"}}`;
      let geodesyMl: string = jsonIxService.jsonToGeodesyMl(JSON.parse(json));
      expect(geodesyMl).not.toBeNull();
    });

    it('should error on invalid GeodesyML', () => {
      let geodesyml: string = `<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.3"
 xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.3"
 xmlns:gml="http://www.opengis.net/gml/3.2"
 xmlns:ns9="http://www.w3.org/1999/xlink"
 xmlns:gmd="http://www.isotc211.org/2005/gmd"
 xmlns:gmx="http://www.isotc211.org/2005/gmx" 
 xmlns:om="http://www.opengis.net/om/2.0" xmlns:gco="http://www.isotc211.org/2005/gco" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" gml:id="GeodesyMLType_20">`;
      let errorStr: string = 'Element [{http://www.w3.org/1999/xhtml}parsererror]'
       + ' could not be unmarshalled as is not known in this context and the property does not allow DOM content.';
      expect(function(){
        jsonIxService.geodesyMlToJson(geodesyml);
      }).toThrow(new Error(errorStr));
      // let json: string = jsonIxService.geodesyMlToJson(geodesyml);
      // console.debug('invalide gml return: ', json);
      // expect(json).not.toBeNull();
    });

    xit('should error on invalid Json', () => {
      // xit commented out as it is Impossible to write invalide JSON since can't construct (or string parse) it
      let json: string = `{"geo:siteLog":{"TYPE_NAME":"GEODESYML_0_3.SiteLogType"`;
      expect(function() {
        jsonIxService.jsonToGeodesyMl(JSON.parse(json));
      }).toThrow('some error');
    });
  });
}
