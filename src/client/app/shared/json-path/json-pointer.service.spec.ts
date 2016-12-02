import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HttpUtilsService } from '../global/http-utils.service';
import { JsonPointerService } from './json-pointer.service';


export function main() {
  describe('Testing of JsonPointerService', () => {
    let jsonPathService: JsonPointerService;
    let jsonObj: any = {
      standardType: { value: '' },
      inputFrequency: '',
      validTime: {
        abstractTimePrimitive: {
          'gml:TimePeriod': {
            beginPosition: { value: [''] },
            endPosition: { value: [''] }
          }
        }
      },
      notes: 'Testing',
      individualName: {
        characterString: {'gco:CharacterString': 'Mark Smith'}
      },
      organisationName: {
        characterString: {'gco:CharacterString': ''}
      },
      contactInfo: {
        ciContact: {
          address: {
            ciAddress: {
              deliveryPoint: [{
                characterString: {'gco:CharacterString': '8 Kemba Street, Mitchell, ACT'}
              }]
            }
          }
        }
      }
    };

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonPointerService,
        HttpUtilsService,
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
      jsonPathService = injector.get(JsonPointerService);
    });

    it('JsonPointerService should be defined', () => {
      expect(JsonPointerService).not.toBeUndefined();
    });

    it('Test dotted path - exists(), get() ... ...', () => {
      expect(jsonObj).toBeDefined();
      expect(jsonPathService.exists(jsonObj, '/standardType/value')).toEqual(true);
      expect(jsonPathService.exists(jsonObj, '/individualName/characterString')).toEqual(true);
      expect(jsonPathService.get(jsonObj, '/inputFrequency')).toEqual('');
      expect(jsonPathService.get(jsonObj, '/notes')).toEqual('Testing');
    });

    it('Test path with string-attribute ... ...', () => {
      expect(jsonPathService.exists(jsonObj, '/organisationName/characterString/gco:CharacterString')).toEqual(true);
      expect(jsonPathService.get(jsonObj, '/individualName/characterString/gco:CharacterString')).toEqual('Mark Smith');
    });

    it('Test path with array ... ...', () => {
      var item: any = jsonPathService.get(jsonObj,
                     '/this/path/doesnt/exist');
      expect(item).toBeNull();
      expect(jsonPathService.exists(jsonObj,
                    '/contactInfo/ciContact/address/ciAddress/deliveryPoint/0'))
                    .toEqual(true);
      expect(jsonPathService.get(jsonObj,
              '/contactInfo/ciContact/address/ciAddress/deliveryPoint/0/characterString/gco:CharacterString'))
              .toEqual('8 Kemba Street, Mitchell, ACT');
    });

    it('Test setting with existing path', () => {
      let path: string = '/organisationName/characterString/gco:CharacterString';
      let newValue: string = 'victor hugo';
      expect(jsonPathService.exists(jsonObj, path)).toEqual(true);
      jsonPathService.set(jsonObj, path, newValue);
      expect(jsonPathService.get(jsonObj, path)).toEqual(newValue);
    });

    it('Test setting with NON-existing path - it should then exist', () => {
      let path: string = '/this/path/doesnt/exist';
      let newValue: string = 'victor hugo';
      expect(jsonPathService.exists(jsonObj, path)).toEqual(false);
      jsonPathService.set(jsonObj, path, newValue);
      expect(jsonPathService.get(jsonObj, path)).toEqual(newValue);
    });
  });
}
