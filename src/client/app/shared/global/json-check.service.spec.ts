import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { JsonCheckService } from './json-check.service';
import { MiscUtilsService } from './misc-utils.service';

export function main() {
  describe('Test Json-Check Service ...', () => {
    let jsonCheckService: JsonCheckService;

    let receiverMissing: any = {
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

    let antennaEmpty: any = {};

    let frequencyStdMissing: any = {
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
        JsonCheckService,
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
      jsonCheckService = injector.get(JsonCheckService);
    });

    it('should be defined', () => {
      expect(JsonCheckService).not.toBeUndefined();
    });

    it('should have a new Receiver object with all missing paths added', () => {
      let receiver: any = jsonCheckService.getValidReceiver(receiverMissing);
      expect(receiver).toBeDefined();
      console.log('Merge Receiver json objects: ', receiver);
      expect(receiver.receiverType.value).toEqual('');
      expect(receiver.serialNumber).toEqual('');
      expect(receiver.dateInstalled.value.length).toEqual(1);
      expect(receiver.satelliteSystem[0].value).toEqual('');
    });

    it('should have a new Antenna object with all missing paths added', () => {
      let antenna: any = jsonCheckService.getValidAntenna(antennaEmpty);
      expect(antenna).toBeDefined();
      console.log('Merge Antenna json objects: ', antenna);
      expect(antenna.antennaType.value).toEqual('');
      expect(antenna.serialNumber).toEqual('');
      expect(antenna.dateInstalled.value.length).toEqual(1);
      expect(antenna.antennaReferencePoint.value).toEqual('');
    });

    it('should have a new Frequency-Standard object with all missing paths added', () => {
      let frequencyStd: any = jsonCheckService.getValidFrequencyStandard(frequencyStdMissing);
      expect(frequencyStd).toBeDefined();
      console.log('Merge Frequency-Standard json objects: ', frequencyStd);
      expect(frequencyStd.standardType.value).toEqual('INTERNAL');
      expect(frequencyStd.notes).toEqual('');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod']
                          .beginPosition.value[0]).toEqual('2016-01-01T12:34:65.000Z');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length).toEqual(1);
    });
  });
}
