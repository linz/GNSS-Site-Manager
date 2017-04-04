import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { JsonViewModelService } from './json-view-model.service';
import { JsonViewModelServiceSpecData } from './json-view-model.service.spec.data';
import { SiteLogViewModel } from './view-model/site-log-view-model';
import { SiteLogDataModel } from './data-model/site-log-data-model';

export function main() {
  let backend: MockBackend = null;
  let jsonViewModelService: JsonViewModelService;
  let completeValidSitelog: any = JsonViewModelServiceSpecData.data();

  describe('JsonViewModelService', () => {

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonViewModelService,
        // JsonixService,
        // ConstantsService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: MockBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]);
      jsonViewModelService = injector.get(JsonViewModelService);
      backend = injector.get(MockBackend);
    });

    it('should be defined', () => {
      expect(jsonViewModelService).toBeDefined();
      expect(completeValidSitelog).toBeDefined();
    });

    it('should translate parts - data to view', () => {

      let siteLogViewModel: SiteLogViewModel = jsonViewModelService.dataModelToViewModelJson(completeValidSitelog);
      let siteLog: any = siteLogViewModel.siteLog;
      expect(siteLog).toBeDefined();
      console.debug('should translate parts - view model: ', siteLog.siteIdentification);
      expect(siteLog.siteIdentification).toBeDefined();
      expect(siteLog.siteIdentification.fourCharacterID).toEqual('ADE1');
      expect(siteLog.siteLocation).toBeDefined();
      expect(siteLog.siteLocation.city).toEqual('Salisbury');
      expect(siteLog.gnssReceivers).toBeDefined();
      expect(siteLog.gnssReceivers.length).not.toBe(0);
      expect(siteLog.gnssAntennas).toBeDefined();
      expect(siteLog.gnssAntennas.length).not.toBe(0);
      expect(siteLog.surveyedLocalTies).toBeDefined();
      expect(siteLog.surveyedLocalTies.length).not.toBe(0);
      expect(siteLog.frequencyStandards).toBeDefined();
      expect(siteLog.frequencyStandards.length).not.toBe(0);
      expect(siteLog.humiditySensors).toBeDefined();
      expect(siteLog.humiditySensors.length).not.toBe(0);
      expect(siteLog.humiditySensors[0].heightDiffToAntenna).toBe(0);
      expect(siteLog.humiditySensors[0].calibrationDate).toBe('2016-11-30T13:56:58.396Z');
      expect(siteLog.humiditySensors[0].accuracyPercentRelativeHumidity).toBe(22.22);
      expect(siteLog.humiditySensors[0].dataSamplingInterval).toBe(120);

      expect(siteLog.pressureSensors).toBeDefined();
      expect(siteLog.pressureSensors.length).not.toBe(0);
      expect(siteLog.temperatureSensors).toBeDefined();
      expect(siteLog.temperatureSensors.length).not.toBe(0);
      expect(siteLog.waterVaporSensors).toBeDefined();
      expect(siteLog.waterVaporSensors.length).not.toBe(0);
      expect(siteLog.siteOwner).toBeDefined();
      expect(siteLog.siteOwner.length).not.toBe(0);
      expect(siteLog.siteContact).toBeDefined();
      expect(siteLog.siteMetadataCustodian).toBeDefined();
      expect(siteLog.siteDataSource).toBeDefined();
      expect(siteLog.moreInformation).toBeDefined();
      expect(siteLog.dataStreams).toBeDefined();
    });

    it('should translate parts - view to data', () => {

      let siteLogViewModel: SiteLogViewModel = jsonViewModelService.dataModelToViewModelJson(completeValidSitelog);
      let siteLogDataModel: SiteLogDataModel = jsonViewModelService.viewModelToDataModelJson(siteLogViewModel);

      expect(siteLogDataModel.humiditySensors).toBeDefined();
      expect(siteLogDataModel.humiditySensors.length).not.toBe(0);
      expect(siteLogDataModel.humiditySensors[0].humiditySensor.heightDiffToAntenna).toBe(0);
      expect(siteLogDataModel.humiditySensors[0].humiditySensor.calibrationDate.value[0]).toBe('2016-11-30T13:56:58.396Z');
      expect(siteLogDataModel.humiditySensors[0].humiditySensor.accuracyPercentRelativeHumidity).toBe(22.22);
      expect(siteLogDataModel.humiditySensors[0].humiditySensor.dataSamplingInterval).toBe(120);

      expect(siteLogDataModel.pressureSensors).toBeDefined();
      expect(siteLogDataModel.pressureSensors.length).not.toBe(0);
      expect(siteLogDataModel.temperatureSensors).toBeDefined();
      expect(siteLogDataModel.temperatureSensors.length).not.toBe(0);
      expect(siteLogDataModel.waterVaporSensors).toBeDefined();
      expect(siteLogDataModel.waterVaporSensors.length).not.toBe(0);
      expect(siteLogDataModel.siteOwner).toBeDefined();
      expect(siteLogDataModel.siteOwner.length).not.toBe(0);
      expect(siteLogDataModel.siteContact).toBeDefined();
      expect(siteLogDataModel.siteMetadataCustodian).toBeDefined();
      expect(siteLogDataModel.siteDataSource).toBeDefined();
      expect(siteLogDataModel.moreInformation).toBeDefined();
      expect(siteLogDataModel.dataStreams).toBeDefined();

    });
  });
}
