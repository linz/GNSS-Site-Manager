import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { JsonCheckService } from './json-check.service';
import { MiscUtilsService } from './misc-utils.service';

export function main() {
  describe('Test Json-Check Service ...', () => {
    let jsonCheckService: JsonCheckService;

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

    fit('should have a new Receiver object with all missing paths added', () => {
      jsonCheckService.checkReceiver(receiver);
      expect(receiver).toBeDefined();
      console.log('Merge Receiver Json objects: ', receiver);
      expect(receiver.receiverType.value).toEqual('');
      expect(receiver.serialNumber).toEqual('');
      expect(receiver.dateInstalled.value.length).toEqual(1);
      expect(receiver.satelliteSystem[0].value).toEqual('');
    });

    fit('should have a new Frequency Standard object with all missing paths added', () => {
      jsonCheckService.checkFrequencyStandard(frequencyStd);
      expect(frequencyStd).toBeDefined();
      console.log('Merge Frequency Standard  Json objects: ', frequencyStd);
      expect(frequencyStd.standardType.value).toEqual('INTERNAL');
      expect(frequencyStd.notes).toEqual('');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]).toEqual('2016-01-01T12:34:65.000Z');
      expect(frequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length).toEqual(1);
    });
  });
}
