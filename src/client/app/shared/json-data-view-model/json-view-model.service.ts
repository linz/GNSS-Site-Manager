import { Injectable } from '@angular/core';
import { SiteLogDataModel } from './data-model/site-log-data-model';
import { GnssAntennaViewModel } from '../../gnss-antenna/gnss-antenna-view-model';
import { GnssReceiverViewModel } from '../../gnss-receiver/gnss-receiver-view-model';
import { SurveyedLocalTieViewModel } from '../../surveyed-local-tie/surveyed-local-tie-view-model';
import { FrequencyStandardViewModel } from '../../frequency-standard/frequency-standard-view-model';
import { LocalEpisodicEffectViewModel } from '../../local-episodic-effect/local-episodic-effect-view-model';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';
import { PressureSensorViewModel } from '../../pressure-sensor/pressure-sensor-view-model';
import { TemperatureSensorViewModel } from '../../temperature-sensor/temperature-sensor-view-model';
import { WaterVaporSensorViewModel } from '../../water-vapor-sensor/water-vapor-sensor-view-model';
import { SiteLogViewModel, ViewSiteLog } from './view-model/site-log-view-model';
import { AbstractViewModel } from './view-model/abstract-view-model';
import { DataViewTranslatorService } from './data-view-translator';
import { FieldMaps } from './field-maps';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */
@Injectable()
export class JsonViewModelService {

    /**
     * Given Geodesy data model JSON, translate to view model json.
     * @param dataModelJson from the GeodesyML - complete ViewSiteLog instance.
     * @return  translated ViewModelJson
     */
    public dataModelToViewModelJson(dataModelJson: any): SiteLogViewModel {
        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel(dataModelJson);
        console.debug('dataModelToViewModelJson - siteLogDataModel: ', siteLogDataModel);

        let siteLogViewModel: SiteLogViewModel = <SiteLogViewModel>{};
        siteLogViewModel.siteLog = new ViewSiteLog();

        siteLogViewModel.siteLog.gnssAntennas = this.dataToViewModel(siteLogDataModel.gnssAntennas,
            GnssAntennaViewModel);
        siteLogViewModel.siteLog.gnssReceivers = this.dataToViewModel(siteLogDataModel.gnssReceivers,
            GnssReceiverViewModel);
        siteLogViewModel.siteLog.surveyedLocalTies = this.dataToViewModel(siteLogDataModel.surveyedLocalTies,
            SurveyedLocalTieViewModel);
        siteLogViewModel.siteLog.frequencyStandards = this.dataToViewModel(siteLogDataModel.frequencyStandards,
            FrequencyStandardViewModel);
        siteLogViewModel.siteLog.localEpisodicEffects = this.dataToViewModel(siteLogDataModel.localEpisodicEffects,
            LocalEpisodicEffectViewModel);
        siteLogViewModel.siteLog.humiditySensors = this.dataToViewModel(siteLogDataModel.humiditySensors,
            HumiditySensorViewModel);
        siteLogViewModel.siteLog.pressureSensors = this.dataToViewModel(siteLogDataModel.pressureSensors,
            PressureSensorViewModel);
        siteLogViewModel.siteLog.temperatureSensors = this.dataToViewModel(siteLogDataModel.temperatureSensors,
            TemperatureSensorViewModel);
        siteLogViewModel.siteLog.waterVaporSensors = this.dataToViewModel(siteLogDataModel.waterVaporSensors,
            WaterVaporSensorViewModel);

        // For now just copy the DataModel parts over that haven't had translate to view written yet
        siteLogViewModel.siteLog.siteIdentification = siteLogDataModel.siteIdentification;
        siteLogViewModel.siteLog.siteLocation = siteLogDataModel.siteLocation;
        siteLogViewModel.siteLog.siteOwner = siteLogDataModel.siteOwner;
        siteLogViewModel.siteLog.siteContact = siteLogDataModel.siteContact;
        siteLogViewModel.siteLog.siteMetadataCustodian = siteLogDataModel.siteMetadataCustodian;
        siteLogViewModel.siteLog.siteDataSource = siteLogDataModel.siteDataSource;
        siteLogViewModel.siteLog.moreInformation = siteLogDataModel.moreInformation;
        siteLogViewModel.siteLog.dataStreamsSet = siteLogDataModel.dataStreamsSet;

        console.debug('dataModelToViewModelJson - siteLogViewModel: ', siteLogViewModel);

        return siteLogViewModel;
    }

    public viewModelToDataModelJson(viewModelJson: SiteLogViewModel): SiteLogDataModel {
        console.debug('viewModelToDataModelJson - viewModelJson: ', viewModelJson);

        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel({});

        siteLogDataModel.gnssAntennas = this.viewToDataModel(viewModelJson.siteLog.gnssAntennas);
        siteLogDataModel.gnssReceivers = this.viewToDataModel(viewModelJson.siteLog.gnssReceivers);
        siteLogDataModel.surveyedLocalTies = this.viewToDataModel(viewModelJson.siteLog.surveyedLocalTies);
        siteLogDataModel.frequencyStandards = this.viewToDataModel(viewModelJson.siteLog.frequencyStandards);
        siteLogDataModel.localEpisodicEffects = this.viewToDataModel(viewModelJson.siteLog.localEpisodicEffects);
        siteLogDataModel.humiditySensors = this.viewToDataModel(viewModelJson.siteLog.humiditySensors);
        siteLogDataModel.pressureSensors = this.viewToDataModel(viewModelJson.siteLog.pressureSensors);
        siteLogDataModel.temperatureSensors = this.viewToDataModel(viewModelJson.siteLog.temperatureSensors);
        siteLogDataModel.waterVaporSensors = this.viewToDataModel(viewModelJson.siteLog.waterVaporSensors);

        siteLogDataModel.siteIdentification = viewModelJson.siteLog.siteIdentification;
        siteLogDataModel.siteLocation = viewModelJson.siteLog.siteLocation;
        siteLogDataModel.siteOwner = viewModelJson.siteLog.siteOwner;
        siteLogDataModel.siteContact = viewModelJson.siteLog.siteContact;
        siteLogDataModel.siteMetadataCustodian = viewModelJson.siteLog.siteMetadataCustodian;
        siteLogDataModel.siteDataSource = viewModelJson.siteLog.siteDataSource;
        siteLogDataModel.moreInformation = viewModelJson.siteLog.moreInformation;
        siteLogDataModel.dataStreamsSet = viewModelJson.siteLog.dataStreamsSet;

        return siteLogDataModel;
    }

    /* ***************************** Helper functions ***************************** */
    /**
     * Translate data model to view model
     * @param dataModels - array of data model items to convert
     * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
     * @returns {AbstractViewModel[]} that is the super type of all view model types
     */
    private dataToViewModel<T extends AbstractViewModel>(dataModels: any[], type: {new(): T ;}): T[] {
        let viewModels: T[] = [];
        for (let dataModel of dataModels) {
            let newViewModel: T = new type();
            let fieldMappings: FieldMaps = newViewModel.getFieldMaps();
            DataViewTranslatorService.translateD2V(dataModel, newViewModel, fieldMappings);  // humiditySensor
            viewModels.push(newViewModel);
        }
        return viewModels;
    }

    /**
     * Translate view model to data model
     * @param viewModels - array of view model items to convert
     * @param viewModelInstance - used as a template to copy and populate.  And has methods used.
     * @returns {any[]} - translated data model
     */
    private viewToDataModel<T extends AbstractViewModel>(viewModels: T[]): any[] {
        let dataModels: any[] = [];
        for (let viewModel of viewModels) {
            let fieldMappings: FieldMaps = viewModel.getFieldMaps();
            let dataModel: any = {};
            DataViewTranslatorService.translateV2D(viewModel, dataModel, fieldMappings);
            dataModels.push(dataModel);
        }
        return dataModels;
    }
}
