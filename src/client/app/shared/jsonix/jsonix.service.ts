import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


declare let XLink_1_0: any;
declare let GML_3_2_1: any;
declare let ISO19139_GMD_20070417: any;
declare let ISO19139_GCO_20070417: any;
declare let ISO19139_GSR_20070417: any;
declare let ISO19139_GTS_20070417: any;
declare let ISO19139_GSS_20070417: any;
declare let OM_2_0: any;
declare let GEODESYML_0_3: any;
declare let Jsonix: any;

let jsonIxMappings: any = [ XLink_1_0, GML_3_2_1, GEODESYML_0_3, ISO19139_GMD_20070417, ISO19139_GCO_20070417,
                            OM_2_0, ISO19139_GSR_20070417, ISO19139_GTS_20070417, ISO19139_GSS_20070417 ];

let jsonIxOptions: any = {
  mappingStyle: 'simplified',
  namespacePrefixes: {
    'http://www.opengis.net/cat/csw/2.0.2': 'csw',
    'urn:xml-gov-au:icsm:egeodesy:0.3': 'geo',
    'http://www.opengis.net/gml/3.2': 'gml',
    'http://www.w3.org/1999/xlink': 'ns9',
    'http://www.isotc211.org/2005/gmd': 'gmd',
    'http://www.isotc211.org/2005/gmx': 'gmx',
    'http://www.opengis.net/om/2.0': 'om',
    'http://www.isotc211.org/2005/gco': 'gco',
    'http://www.w3.org/2001/XMLSchema-instance': 'xsi'
  }
};
let context: any = new Jsonix.Context(jsonIxMappings, jsonIxOptions);
let unmarshaller: any = context.createUnmarshaller();
let marshaller: any = context.createMarshaller();

/**
 * This class provides the service to transfer data in GeodesyML format to and from the back end services, and translate to
 * work with JSON on the client side.
 */
@Injectable()
export class JsonixService {
  // WS_URL : string = 'http://localhost:8080/geodesy-web-services';
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // dev
  // static WS_URL: string = 'https://dev.geodesy.ga.gov.au'; // test

  /**
   * Given valid GeodesyML instatnce, translate to JSON.
   *
   * @param geodesyMl valid input to translate
   * @return The  JSON representation of the given geodesyMl
   */
  geodesyMlToJson(geodesyMl: string): string {
    console.debug('JsonixService - geodesyMlToJson - geodesyMl (length): ', geodesyMl.length);
    // console.debug('JsonixService - geodesyMlToJson - geodesyMl: ', geodesyMl);

    let json: string = unmarshaller.unmarshalString(geodesyMl);
    console.log('JsonixService - geodesyMlToJson - translated JSON: ', json);
    return json;
  };

  /**
   * Given 'valid' JSON insance, translate to valid GeodesyMl.
   * @param json that is 'valid' to translate
   * @returns {string} the valid GeodesyMl
   */
  jsonToGeodesyMl(json: string): string {
    let jsonString: string = JSON.stringify(json);
    console.debug('JsonixService - jsonToGeodesyMl - json (length): ', jsonString.length);
    // console.debug('JsonixService - jsonToGeodesyMl - json: ', jsonString);

    let geodesyMl: string = marshaller.marshalString(json);
    console.log('JsonixService - jsonToGeodesyMl - translated geodesyMl: ', geodesyMl);
    return geodesyMl;
  }
}
