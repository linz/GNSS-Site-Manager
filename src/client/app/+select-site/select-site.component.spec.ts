import { Component, provide } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {
  async,
  inject
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  HTTP_PROVIDERS
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { CorsSiteService } from '../shared/index';
import { SelectSiteComponent } from './select-site.component';

export function main() {
  describe('SelectSite component', () => {
    // Disable old forms
    let providerArr: any[];

    beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms()]; });

    it('should work',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((rootTC: any) => {

            rootTC.detectChanges();

            let selectSiteInstance = rootTC.debugElement.children[0].componentInstance;
            let selectSiteDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(selectSiteInstance.corsSiteService).toEqual(jasmine.any(CorsSiteService));
            expect(getDOM().querySelectorAll(selectSiteDOMEl, 'li').length).toEqual(0);

            selectSiteInstance.fourCharacterId = 'ALIC';
            selectSiteInstance.searchSites();

            rootTC.detectChanges();

            expect(getDOM().querySelectorAll(selectSiteDOMEl, 'li').length).toEqual(1);
            expect(getDOM().querySelectorAll(selectSiteDOMEl, 'li')[0].textContent).toEqual('ALIC');
          });
      })));
  });
}

@Component({
  providers: [
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
  ],
  selector: 'test-cmp',
  template: '<sd-select-site></sd-select-site>',
  directives: [SelectSiteComponent]
})
class TestComponent {}
