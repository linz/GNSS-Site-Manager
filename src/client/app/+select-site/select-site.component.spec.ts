import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
// import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  async,
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http, HttpModule
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { CorsSiteService } from '../shared/index';
import { SelectSiteModule } from './select-site.module';
export function main() {
  describe('SelectSite component', () => {
    // Disable old forms
    // let providerArr: any[];

    // beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, HttpModule, SelectSiteModule],
      declarations: [TestComponent],
      providers: [
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
class TestComponent {
}
