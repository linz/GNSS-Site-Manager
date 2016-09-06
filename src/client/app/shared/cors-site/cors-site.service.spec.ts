// New Code (todo fix it)

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
// import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  async,
  inject
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http, HttpModule
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { SharedModule } from '../shared.module';
// import { SelectSiteComponent } from './select-site.component';
// import { SelectSiteModule } from './select-site.module';
export function main() {
  describe('CorsSite Service', () => {
    // Disable old forms
    // let providerArr: any[];

    // beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, HttpModule, SharedModule],
      declarations: [TestComponent],
      providers: [
        CorsSiteService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            let selectSiteInstance = fixture.debugElement.children[0].componentInstance;
            let selectSiteDOMEl = fixture.debugElement.children[0].nativeElement;

            expect(selectSiteInstance.corsSiteService).toEqual(jasmine.any(CorsSiteService));
            expect(getDOM().querySelectorAll(selectSiteDOMEl, 'li').length).toEqual(0);

            selectSiteInstance.fourCharacterId = 'ALIC';
            selectSiteInstance.searchSites();

            fixture.detectChanges();

            expect(getDOM().querySelectorAll(selectSiteDOMEl, 'li').length).toEqual(1);
            expect(getDOM().querySelectorAll(selectSiteDOMEl, 'li')[0].textContent).toEqual('ALIC');
          });

      }));

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

@Component({
  // providers: [
  //   HTTP_PROVIDERS,
  //   CorsSiteService,
  //   BaseRequestOptions,
  //   MockBackend,
  //   provide(Http, {
  //     useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
  //       return new Http(backend, defaultOptions);
  //     },
  //     deps: [MockBackend, BaseRequestOptions]
  //   }),
  // ],
  selector: 'test-cmp',
  template: '<sd-select-site></sd-select-site>',
  // directives: [SelectSiteComponent]
})

// Original code

class TestComponent {
}


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
