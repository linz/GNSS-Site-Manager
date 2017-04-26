import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { TemperatureSensorItemComponent } from './temperature-sensor-item.component';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensors-group',
    templateUrl: 'temperature-sensors-group.component.html',
})
export class TemperatureSensorsGroupComponent extends AbstractGroup<TemperatureSensorViewModel> implements OnInit {

    static compare(obj1: TemperatureSensorViewModel, obj2: TemperatureSensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
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
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.temperatureSensors);
        console.log('TemperatureSensors (Original): ', this.getItemsOriginalCollection());
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set in the @Input
        // this.setupForm();
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
