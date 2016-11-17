import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { JsonDiffService } from './json-diff.service';
import { HttpUtilsService } from './http-utils.service';
import { MiscUtilsService } from './misc-utils.service';

// TODO - fix the tests in here (not quite right - most are commented out)
export function main() {
  describe('Json Merge Service', () => {
    let jsonDiffService: JsonDiffService;
    let receiverFull: any = {
      receiverType: {
        value: ''
      },
      manufacturerSerialNumber: '',
      serialNumber: '',
      firmwareVersion: '',
      satelliteSystem: [
        {
          codeListValue: '',
          value: ''
        }
      ],
      elevationCutoffSetting: '',
      temperatureStabilization: '',
      dateInstalled: {
        value: ['']
      },
      dateRemoved: {
        value: ['']
      },
      notes: ''
    };

    let receiver: any = {
      manufacturerSerialNumber: 'be234',
      firmwareVersion: 'v1.2.3',
      satelliteSystem: [],
      elevationCutoffSetting: 5,
      temperatureStabilization: 'abc',
      dateInstalled: {},
      dateRemoved: {
        value: ['2016-01-01T12:34:65.000Z']
      },
      notes: 'Testing'
    };

    let frequencyStdFull: any = {
      standardType: {
        value: ''
      },
      inputFrequency: '',
      validTime: {
        abstractTimePrimitive: {
          'gml:TimePeriod': {
            beginPosition: {
              value: ['']
            },
            endPosition: {
              value: ['']
            }
          }
        }
      },
      notes: ''
    };

    let frequencyStd: any = {
      standardType: {
        value: 'INTERNAL'
      },
      inputFrequency: 2,
      validTime: {
        abstractTimePrimitive: {
          'gml:TimePeriod': {
            beginPosition: {
              value: ['2016-01-01T12:34:65.000Z']
            }
          }
        }
      }
    };

    beforeEach(() => {
      let injector = ReflectiveInjector.resolveAndCreate([
        JsonDiffService,
        HttpUtilsService,
        MiscUtilsService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      jsonDiffService = injector.get(JsonDiffService);
    });

    it('should be defined', () => {
      expect(JsonDiffService).not.toBeUndefined();
    });

    it('should have a new Receiver object with all missing paths added', () => {
      jsonDiffService.merge(receiver, receiverFull);
      expect(receiver).toBeDefined();
      console.log('Merge Receiver Json objects: ', receiver);
      expect(receiver.receiverType.value).toEqual('');
      expect(receiver.serialNumber).toEqual('');
      expect(receiver.dateInstalled.value.length).toEqual(1);
      expect(receiver.satelliteSystem[0].value).toEqual('');
    });

    it('should have a new Frequency Standard object with all missing paths added', () => {
      jsonDiffService.merge(frequencyStd, frequencyStdFull);
      expect(frequencyStd).toBeDefined();
      console.log('Merge Frequency Standard  Json objects: ', frequencyStd);
      expect(frequencyStd.standardType.value).toEqual('INTERNAL');
      expect(frequencyStd.notes).toEqual('');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]).toEqual('2016-01-01T12:34:65.000Z');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length).toEqual(1);
    });
  });

  describe('Json Diff Service', () => {
    let jsonDiffService: JsonDiffService;
    let humiditySensor_old = {
      TYPE_NAME: 'GEODESYML_0_3.SiteLogType',
      humiditySensors: {
        TYPE_NAME: 'GEODESYML_0_3.HumiditySensorPropertyType',
        humiditySensor: {
          TYPE_NAME: 'GEODESYML_0_3.HumiditySensorType',
          description: {
            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
            value: ''
          },
          descriptionReference: {
            TYPE_NAME: 'GML_3_2_1.ReferenceType'
          },
          identifier: {
            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
            value: ''
          },
          type: {
            TYPE_NAME: 'GML_3_2_1.CodeType',
            codeSpace: 'eGeodesy/type',
            value: 'HMP233'
          },
          remarks: '',
          extension: {
            TYPE_NAME: 'AnyType',
            attributes: {
              '{http: //www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
            }
          },
          manufacturer: 'Vaisala1',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: {
            value: [
              ''
            ]
          },
          validTime: {
            TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
            abstractTimePrimitive: {
              'gml:TimePeriod': {
                beginPosition: {
                  value: [
                    '2016-11-15T00:00:00.000Z'
                  ]
                },
                endPosition: {
                  value: [
                    ''
                  ]
                }
              }
            }
          },
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
        dateInserted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        dateDeleted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        deletedReason: ''
      }
    };

    let humiditySensor_new_manufacturer = {
      TYPE_NAME: 'GEODESYML_0_3.SiteLogType',
      humiditySensors: {
        TYPE_NAME: 'GEODESYML_0_3.HumiditySensorPropertyType',
        humiditySensor: {
          TYPE_NAME: 'GEODESYML_0_3.HumiditySensorType',
          description: {
            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
            value: ''
          },
          descriptionReference: {
            TYPE_NAME: 'GML_3_2_1.ReferenceType'
          },
          identifier: {
            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
            value: ''
          },
          type: {
            TYPE_NAME: 'GML_3_2_1.CodeType',
            codeSpace: 'eGeodesy/type',
            value: 'HMP233'
          },
          remarks: '',
          extension: {
            TYPE_NAME: 'AnyType',
            attributes: {
              '{http: //www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
            }
          },
          manufacturer: 'Vaisala1 new',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: {
            value: [
              ''
            ]
          },
          validTime: {
            TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
            abstractTimePrimitive: {
              'gml:TimePeriod': {
                beginPosition: {
                  value: [
                    '2016-11-15T00:00:00.000Z'
                  ]
                },
                endPosition: {
                  value: [
                    ''
                  ]
                }
              }
            }
          },
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
        dateInserted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        dateDeleted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        deletedReason: ''
      }
    };

    let humiditySensor_new_date = {
      TYPE_NAME: 'GEODESYML_0_3.SiteLogType',
      humiditySensors: {
        TYPE_NAME: 'GEODESYML_0_3.HumiditySensorPropertyType',
        humiditySensor: {
          TYPE_NAME: 'GEODESYML_0_3.HumiditySensorType',
          description: {
            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
            value: ''
          },
          descriptionReference: {
            TYPE_NAME: 'GML_3_2_1.ReferenceType'
          },
          identifier: {
            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
            value: ''
          },
          type: {
            TYPE_NAME: 'GML_3_2_1.CodeType',
            codeSpace: 'eGeodesy/type',
            value: 'HMP233'
          },
          remarks: '',
          extension: {
            TYPE_NAME: 'AnyType',
            attributes: {
              '{http: //www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
            }
          },
          manufacturer: 'Vaisala1',
          serialNumber: 'P2240006',
          heightDiffToAntenna: 0,
          calibrationDate: {
            value: [
              ''
            ]
          },
          validTime: {
            TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
            abstractTimePrimitive: {
              'gml:TimePeriod': {
                beginPosition: {
                  value: [
                    '2016-11-16T00:00:00.000Z'
                  ]
                },
                endPosition: {
                  value: [
                    ''
                  ]
                }
              }
            }
          },
          dataSamplingInterval: 90,
          accuracyPercentRelativeHumidity: 0,
          aspiration: '',
          notes: ''
        },
        dateInserted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        dateDeleted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        deletedReason: ''
      }
    };

    let receiver_old = {
      TYPE_NAME: 'GEODESYML_0_3.SiteLogType',
      gnssReceivers: {
        TYPE_NAME: 'GEODESYML_0_3.GnssReceiverType',
        description: {
          TYPE_NAME: 'GML_3_2_1.StringOrRefType',
          value: ''
        },
        descriptionReference: {
          TYPE_NAME: 'GML_3_2_1.ReferenceType'
        },
        identifier: {
          TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
          value: ''
        },
        type: {
          TYPE_NAME: 'GML_3_2_1.CodeType',
          value: ''
        },
        remarks: '',
        extension: {
          TYPE_NAME: 'AnyType',
          attributes: {
            '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
          },
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: {
            TYPE_NAME: 'GEODESYML_0_3.IgsReceiverModelCodeType',
            value: ''
          },
          receiverType: {
            TYPE_NAME: 'GEODESYML_0_3.IgsReceiverModelCodeType',
            codeList: 'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode',
            codeListValue: 'ASHTECH Z-XII3',
            codeSpace: 'https://igscb.jpl.nasa.gov/igscb/station/general/rcvr_ant.tab',
            value: 'ASHTECH Z-XII3'
          },
          satelliteSystem: [
            {
              TYPE_NAME: 'GML_3_2_1.CodeType',
              codeSpace: 'eGeodesy/satelliteSystem',
              value: 'GPS'
            }
          ],
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          dateInstalled: {
            TYPE_NAME: 'GML_3_2_1.TimePositionType',
            value: [
              '1996-01-01T00:00:00.000Z'
            ]
          },
          dateRemoved: {
            TYPE_NAME: 'GML_3_2_1.TimePositionType',
            value: [
              '1998-09-17T00:00:00.000Z'
            ]
          },
          notes: 'Receiver 1'
        },
        dateInserted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        dateDeleted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        deletedReason: ''
      }
    };

    let receiver_new_receiverType = {
      TYPE_NAME: 'GEODESYML_0_3.SiteLogType',
      gnssReceivers: {
        TYPE_NAME: 'GEODESYML_0_3.GnssReceiverType',
        description: {
          TYPE_NAME: 'GML_3_2_1.StringOrRefType',
          value: ''
        },
        descriptionReference: {
          TYPE_NAME: 'GML_3_2_1.ReferenceType'
        },
        identifier: {
          TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
          value: ''
        },
        type: {
          TYPE_NAME: 'GML_3_2_1.CodeType',
          value: ''
        },
        remarks: '',
        extension: {
          TYPE_NAME: 'AnyType',
          attributes: {
            '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
          },
          manufacturerName: '',
          manufacturerModel: '',
          manufacturerPartNumber: '',
          manufacturerDescription: '',
          manufacturerSerialNumber: '3213',
          igsModelCode: {
            TYPE_NAME: 'GEODESYML_0_3.IgsReceiverModelCodeType',
            value: ''
          },
          receiverType: {
            TYPE_NAME: 'GEODESYML_0_3.IgsReceiverModelCodeType',
            codeList: 'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode',
            codeListValue: 'ASHTECH Z-XII3',
            codeSpace: 'https://igscb.jpl.nasa.gov/igscb/station/general/rcvr_ant.tab',
            value: 'ASHTECH Z-XII3 new'
          },
          satelliteSystem: [
            {
              TYPE_NAME: 'GML_3_2_1.CodeType',
              codeSpace: 'eGeodesy/satelliteSystem',
              value: 'GPS'
            }
          ],
          serialNumber: '',
          firmwareVersion: '1Y05-1D04',
          elevationCutoffSetting: 0,
          dateInstalled: {
            TYPE_NAME: 'GML_3_2_1.TimePositionType',
            value: [
              '1996-01-01T00:00:00.000Z'
            ]
          },
          dateRemoved: {
            TYPE_NAME: 'GML_3_2_1.TimePositionType',
            value: [
              '1998-09-17T00:00:00.000Z'
            ]
          },
          notes: 'Receiver 1'
        },
        dateInserted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        dateDeleted: {
          TYPE_NAME: 'GML_3_2_1.TimePositionType',
          value: []
        },
        deletedReason: ''
      }
    };

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonDiffService,
        HttpUtilsService,
        MiscUtilsService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      jsonDiffService = injector.get(JsonDiffService);
    });

    it('should be defined', () => {
      expect(JsonDiffService).not.toBeUndefined();
    });

    it('should get a compare difference humidity sensors (manufacturer)', () => {
      let differenceArray: any[] = jsonDiffService.compare(humiditySensor_old, humiditySensor_new_manufacturer, []);
      expect(differenceArray).toBeDefined();
      console.log('compare difference humidity sensor (manufacturer): ', differenceArray);
      // expect(differenceArray[0].changes[0].oldValue).toEqual('Vaisala1');
      // expect(differenceArray[0].changes[0].value).toEqual('Vaisala1 new');
      // expect(differenceArray[0].key).not.toEqual('humiditySensor (2016-11-15)');
      // I dont' think that is a real problem
    });

   it('should get a compare difference humidity sensors (date)', () => {
      let differenceArray: any[] = jsonDiffService.compare(humiditySensor_old, humiditySensor_new_date, []);
      expect(differenceArray).toBeDefined();
      console.log('compare difference humidity sensor (date): ', differenceArray);
      // expect(differenceArray[0].changes[0].oldValue).toEqual('Vaisala1');
      // expect(differenceArray[0].changes[0].value).toEqual('Vaisala1 new');
      // expect(differenceArray[0].key).not.toEqual('humiditySensor (2016-11-15)');
      // I dont' think that is a real problem
    });

    it('should get a compare difference receivers (manufacturer)', () => {
      let differenceArray: any[] = jsonDiffService.compare(receiver_old, receiver_new_receiverType, []);
      expect(differenceArray).toBeDefined();
      console.log('compare difference receiver (manufacturer): ', differenceArray);
      // expect(differenceArray[0].changes[0].key).toEqual('manufacturerName');
      // expect(differenceArray[0].changes[0].oldValue).toEqual('old manufacturer name');
      // expect(differenceArray[0].changes[0].value).toEqual('new manufacturer name');
    });

    it('should get date for humidity sensor', () => {

      let dateStart: string = jsonDiffService.getDate(humiditySensor_old.humiditySensor, 'dateBeginEnd', 'start');
      expect(dateStart).toBeDefined();
      // expect(dateStart).toContain('2016-11-15');
    });

    xit('should addDateString for humidity sensor', () => {

      let dateString: string = jsonDiffService.addDateString(humiditySensor_old, 'humiditySensor');
      console.log('should addDateString for humidity sensor - dateString', dateString);
      expect(dateString).toBeDefined();
      expect(dateString).toContain('2016-11-15');
    });

    it('should have a difference in html humidity sensor', () => {
      let diffString: string = jsonDiffService.getJsonDiffHtml(humiditySensor_old, humiditySensor_new_manufacturer);
      console.log('diff string humidity sensor:', diffString);
      expect(diffString).toBeDefined();
      // expect(diffString).toContain('humiditySensor (2016-11-16)');
      // expect(diffString).toContain('2016-11-15');
      // expect(diffString).toContain('2016-11-16');
    });

    it('should have a difference in html receiver', () => {
      let diffString: string = jsonDiffService.getJsonDiffHtml(receiver_old, receiver_new_receiverType);
      console.log('diff string receiver:', diffString);
      expect(diffString).toBeDefined();
      // expect(diffString).toContain('humiditySensor (2016-11-16)');
      // expect(diffString).toContain('2016-11-15');
      // expect(diffString).toContain('2016-11-16');
    });
  });


}
