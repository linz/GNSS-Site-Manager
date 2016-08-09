import { provide, ReflectiveInjector } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { BaseRequestOptions, ConnectionBackend, Http, HTTP_PROVIDERS, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { CorsSiteService } from './cors-site.service';

export function main() {
  describe('CorsSite Service', () => {
    let corsSiteService: CorsSiteService;
    let backend: MockBackend;
    let initialResponse: any;
    let providerArr: any[];

    beforeEach(() => {
      providerArr = [disableDeprecatedForms(), provideForms()];

      let injector = ReflectiveInjector.resolveAndCreate([
        disableDeprecatedForms(),
        provideForms(),
        HTTP_PROVIDERS,
        CorsSiteService,
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }),
      ]);
      corsSiteService = injector.get(CorsSiteService);
      backend = injector.get(MockBackend);

      let connection: any;
      backend.connections.subscribe((c: any) => connection = c);
      initialResponse = corsSiteService.getAllCorsSites();
      connection.mockRespond(new Response(new ResponseOptions({ body: '["AAAA", "ALIC"]' })));
    });

    it('should return an Observable when get called', () => {
      expect(initialResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of names when get called', () => {
      let names: any;
      initialResponse.subscribe((data: any) => names = data);
      expect(names).toEqual(['AAAA', 'ALIC']);
    });
  });
}
