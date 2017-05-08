import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensors-group',
    templateUrl: 'temperature-sensors-group.component.html',
})
export class TemperatureSensorsGroupComponent extends AbstractGroupComponent<TemperatureSensorViewModel> {

    static compare(obj1: TemperatureSensorViewModel, obj2: TemperatureSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.temperatureSensors);
            this.setupForm('temperatureSensors');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.temperatureSensors);
        }
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    compare(obj1: TemperatureSensorViewModel, obj2: TemperatureSensorViewModel): number {
        return TemperatureSensorsGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): TemperatureSensorViewModel {
        return new TemperatureSensorViewModel(blank);
    }
}
