import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';

/**.
 * This class represents a group of Humidity Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensors-group',
    templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends AbstractGroupComponent<HumiditySensorViewModel> {

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    getControlName(): string {
        return 'humiditySensors';
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(blank?: boolean): HumiditySensorViewModel {
        return new HumiditySensorViewModel(blank);
    }
}
