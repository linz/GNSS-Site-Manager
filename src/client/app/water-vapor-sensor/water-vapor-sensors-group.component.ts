import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { WaterVaporSensorItemComponent } from './water-vapor-sensor-item.component';

/**
 * This class represents a group of WaterVapor Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensors-group',
    templateUrl: 'water-vapor-sensors-group.component.html',
})
export class WaterVaporSensorsGroupComponent extends AbstractGroup<WaterVaporSensorViewModel> implements OnInit {
    static compare(obj1: WaterVaporSensorViewModel, obj2: WaterVaporSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
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
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.waterVaporSensors);
        console.log('WaterVaporSensors (Original): ', this.getItemsOriginalCollection());
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set in the @Input
        // this.setupForm();
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
