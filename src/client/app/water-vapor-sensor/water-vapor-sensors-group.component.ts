import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents a group of WaterVapor Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensors-group',
    templateUrl: 'water-vapor-sensors-group.component.html',
})
export class WaterVaporSensorsGroupComponent extends AbstractGroupComponent<WaterVaporSensorViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Water Vapor Sensor';
    }

    getControlName(): string {
        return 'waterVaporSensors';
    }

    getNewItemViewModel(): WaterVaporSensorViewModel {
        return new WaterVaporSensorViewModel();
    }
}
