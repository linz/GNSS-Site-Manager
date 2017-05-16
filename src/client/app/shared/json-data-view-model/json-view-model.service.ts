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
import { ResponsiblePartyViewModel } from '../../responsible-party/responsible-party-view-model';
import { SiteLogViewModel, ViewSiteLog } from './view-model/site-log-view-model';
import { AbstractViewModel } from './view-model/abstract-view-model';
import { DataViewTranslatorService, doWriteViewToData, FieldMap } from './data-view-translator';
import { SiteIdentificationMappings } from '../../site-log/site-identification.mapping';
import { SiteLocationMappings } from '../../site-log/site-location.mapping';

/**
 * This class provides the service to convert from 'Geodesy data model JSON' (from the XML via Jsonix) to
 * 'Geodesy view model JSON' as consumed by the UI component classes.
 */
@Injectable()
export class JsonViewModelService {
    private _siteLogDataModel: SiteLogDataModel;
    /**
     * Given Geodesy data model JSON, translate to view model json.
     * @param dataModel from the GeodesyML - complete ViewSiteLog instance.
     * @return  translated ViewModel
     */
    public dataModelToViewModel(dataModel: any): SiteLogViewModel {
        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel(dataModel);
        console.debug('dataModelToViewModel - siteLogDataModel: ', siteLogDataModel);

        let siteLogViewModel: SiteLogViewModel = new SiteLogViewModel();
        let siteLogView: ViewSiteLog = siteLogViewModel.siteLog;

        siteLogView.gnssAntennas = this.dataToViewModel(siteLogDataModel.gnssAntennas, GnssAntennaViewModel);
        siteLogView.gnssReceivers = this.dataToViewModel(siteLogDataModel.gnssReceivers, GnssReceiverViewModel);
        siteLogView.surveyedLocalTies = this.dataToViewModel(siteLogDataModel.surveyedLocalTies, SurveyedLocalTieViewModel);
        siteLogView.frequencyStandards = this.dataToViewModel(siteLogDataModel.frequencyStandards, FrequencyStandardViewModel);
        siteLogView.localEpisodicEffects = this.dataToViewModel(siteLogDataModel.localEpisodicEffects, LocalEpisodicEffectViewModel);
        siteLogView.humiditySensors = this.dataToViewModel(siteLogDataModel.humiditySensors, HumiditySensorViewModel);
        siteLogView.pressureSensors = this.dataToViewModel(siteLogDataModel.pressureSensors, PressureSensorViewModel);
        siteLogView.temperatureSensors = this.dataToViewModel(siteLogDataModel.temperatureSensors, TemperatureSensorViewModel);
        siteLogView.waterVaporSensors = this.dataToViewModel(siteLogDataModel.waterVaporSensors, WaterVaporSensorViewModel);

        // Form (View) Model approach
        DataViewTranslatorService.translate(siteLogDataModel.siteIdentification, siteLogView.siteIdentification,
            new SiteIdentificationMappings().getFieldMaps());

        DataViewTranslatorService.translate(siteLogDataModel.siteLocation, siteLogView.siteLocation,
            new SiteLocationMappings().getFieldMaps());

        siteLogView.siteOwner = [this.dataToViewModelItem(siteLogDataModel.siteOwner, ResponsiblePartyViewModel)];
        siteLogView.siteContact = this.dataToViewModel(siteLogDataModel.siteContact, ResponsiblePartyViewModel);
        siteLogView.siteMetadataCustodian = [this.dataToViewModelItem(siteLogDataModel.siteMetadataCustodian, ResponsiblePartyViewModel)];
        siteLogView.siteDataSource = this.dataToViewModel(siteLogDataModel.siteDataSource, ResponsiblePartyViewModel);
        siteLogView.siteDataCenter = this.dataToViewModel(siteLogDataModel.siteDataCenter, ResponsiblePartyViewModel);

        // For now just copy the DataModel parts over that haven't had translate to view written yet
        siteLogView.moreInformation = siteLogDataModel.moreInformation;
        siteLogView.dataStreams = siteLogDataModel.dataStreams;

        console.debug('dataModelToViewModel - siteLogViewModel: ', siteLogViewModel);
        return siteLogViewModel;
    }

    public viewModelToDataModel(viewModel: SiteLogViewModel): SiteLogDataModel {
        console.debug('viewModelToDataModel - viewModel: ', viewModel);

        let siteLogDataModel: SiteLogDataModel = new SiteLogDataModel({'geo:siteLog':{}});

        siteLogDataModel.gnssAntennas = this.viewToDataModel(viewModel.siteLog.gnssAntennas);
        siteLogDataModel.gnssReceivers = this.viewToDataModel(viewModel.siteLog.gnssReceivers);
        siteLogDataModel.surveyedLocalTies = this.viewToDataModel(viewModel.siteLog.surveyedLocalTies);
        siteLogDataModel.frequencyStandards = this.viewToDataModel(viewModel.siteLog.frequencyStandards);
        siteLogDataModel.localEpisodicEffects = this.viewToDataModel(viewModel.siteLog.localEpisodicEffects);
        siteLogDataModel.humiditySensors = this.viewToDataModel(viewModel.siteLog.humiditySensors);
        siteLogDataModel.pressureSensors = this.viewToDataModel(viewModel.siteLog.pressureSensors);
        siteLogDataModel.temperatureSensors = this.viewToDataModel(viewModel.siteLog.temperatureSensors);
        siteLogDataModel.waterVaporSensors = this.viewToDataModel(viewModel.siteLog.waterVaporSensors);

        DataViewTranslatorService.translate(viewModel.siteLog.siteIdentification, siteLogDataModel.siteIdentification,
            new SiteIdentificationMappings().getFieldMaps(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteLog.siteLocation, siteLogDataModel.siteLocation,
            new SiteLocationMappings().getFieldMaps(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteLog.siteContact, siteLogDataModel.siteContact,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteLog.siteDataSource, siteLogDataModel.siteDataSource,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteLog.siteDataCenter, siteLogDataModel.siteDataCenter,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);

        // Only one siteOwner, siteMetadataCustodian (at most) in an array
        DataViewTranslatorService.translate(viewModel.siteLog.siteOwner[0], siteLogDataModel.siteOwner,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);

        DataViewTranslatorService.translate(viewModel.siteLog.siteMetadataCustodian[0], siteLogDataModel.siteMetadataCustodian,
            new ResponsiblePartyViewModel().getFieldMaps(), doWriteViewToData);

        siteLogDataModel.moreInformation = viewModel.siteLog.moreInformation;
        siteLogDataModel.dataStreams = viewModel.siteLog.dataStreams;

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
            let newViewModel: T = this.dataToViewModelItem(dataModel, type);
            viewModels.push(newViewModel);
        }
        return viewModels;
    }

    /**
     * Translate a single data model Item to view model.
     * @param dataModel
     * @param type of the ViewModel
     * @return {T} translated view model
     */
    private dataToViewModelItem<T extends AbstractViewModel>(dataModel: any, type: {new(): T ;}): T {
        let newViewModel: T = new type();
        DataViewTranslatorService.translateD2V(dataModel, newViewModel, newViewModel.getFieldMaps());
        return newViewModel;
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
            let fieldMappings: FieldMap[] = (<T> viewModel).getFieldMaps();
            let dataModel: any = {};
            DataViewTranslatorService.translateV2D(viewModel, dataModel, fieldMappings);
            dataModels.push(dataModel);
        }
        return dataModels;
    }
}
