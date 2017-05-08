import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';

/**
 * This class represents a group of WaterVapor Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensors-group',
    templateUrl: 'water-vapor-sensors-group.component.html',
})
export class WaterVaporSensorsGroupComponent extends AbstractGroupComponent<WaterVaporSensorViewModel> {
    static compare(obj1: WaterVaporSensorViewModel, obj2: WaterVaporSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.waterVaporSensors);
            this.setupForm('waterVaporSensors');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.waterVaporSensors);
        }
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Water Vapor Sensor';
    }

    compare(obj1: WaterVaporSensorViewModel, obj2: WaterVaporSensorViewModel): number {
        return WaterVaporSensorsGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): WaterVaporSensorViewModel {
        return new WaterVaporSensorViewModel(blank);
    }
}
