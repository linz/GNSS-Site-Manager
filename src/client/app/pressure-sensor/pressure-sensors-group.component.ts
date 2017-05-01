import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { PressureSensorViewModel } from './pressure-sensor-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensors-group',
    templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroup<PressureSensorViewModel> {
    static compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.pressureSensors);
            this.setupForm('pressureSensors');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.pressureSensors);
        }
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
        return PressureSensorsGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): PressureSensorViewModel {
        return new PressureSensorViewModel(blank);
    }
}
