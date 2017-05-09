import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { PressureSensorViewModel } from './pressure-sensor-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensors-group',
    templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroupComponent<PressureSensorViewModel> {
    static compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    getControlName(): string {
        return 'pressureSensors';
    }

    compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
        return PressureSensorsGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): PressureSensorViewModel {
        return new PressureSensorViewModel(blank);
    }
}
