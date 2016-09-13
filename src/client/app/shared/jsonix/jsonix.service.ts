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

let jsonIxMappings: any = [XLink_1_0, GML_3_2_1, GEODESYML_0_3, ISO19139_GMD_20070417, ISO19139_GCO_20070417, OM_2_0,
  ISO19139_GSR_20070417, ISO19139_GTS_20070417, ISO19139_GSS_20070417];

let jsonIxOptions: any = {
  mappingStyle: 'simplified'
};
let context: any = new Jsonix.Context(jsonIxMappings, jsonIxOptions);
let unmarshaller: any = context.createUnmarshaller();

/**
 * This class provides the service to transfer data in GeodesyML format to and from the back end services, and translate to
 * work with JSON on the client side.
 */
@Injectable()
export class JsonixService {
  // WS_URL : string = 'http://localhost:8080/geodesy-web-services';
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // dev
  static WS_URL: string = 'https://dev.geodesy.ga.gov.au'; // test

  /**
   * Given valid GeodesyML instatnce, use translate to JSON.
   *
   * @param geodesyMl valid input to translate
   * @return The  JSON representation of the given geodesyMl
   */
  geodesyMlToJson(geodesyMl: string): string {
    console.debug('geodesyMlToJson - geodesyMl (length): ', geodesyMl.length);

    let json: string = unmarshaller.unmarshalString(geodesyMl);
    console.log('JsonixService - translated JSON: ', json);
    return json;
  };
}
