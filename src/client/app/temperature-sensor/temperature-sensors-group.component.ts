import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensors-group',
    templateUrl: 'temperature-sensors-group.component.html',
})
export class TemperatureSensorsGroupComponent extends AbstractGroupComponent<TemperatureSensorViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    getControlName(): string {
        return 'temperatureSensors';
    }

    newItemViewModel(blank?: boolean): TemperatureSensorViewModel {
        return new TemperatureSensorViewModel(blank);
    }
}
