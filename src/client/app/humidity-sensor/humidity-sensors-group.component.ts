import { Component, Input } from '@angular/core';
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
    static compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.humiditySensors);
            this.setupForm('humiditySensors');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.humiditySensors);
        }
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
        return HumiditySensorsGroupComponent.compare(obj1, obj2);
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(blank?: boolean): HumiditySensorViewModel {
        return new HumiditySensorViewModel(blank);
    }
}
