import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { PressureSensorViewModel } from './pressure-sensor-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensors-group',
    templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroupComponent<PressureSensorViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    getControlName(): string {
        return 'pressureSensors';
    }

    newItemViewModel(): PressureSensorViewModel {
        return new PressureSensorViewModel();
    }
}
