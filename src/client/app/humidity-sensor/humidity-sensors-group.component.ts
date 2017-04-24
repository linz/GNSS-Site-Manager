import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { HumiditySensorItemComponent } from './humidity-sensor-item.component';

/**.
 * This class represents a group of Humidity Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensors-group',
    templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends AbstractGroup<HumiditySensorViewModel> implements OnInit {
    static compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
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
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.humiditySensors);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set in the @Input
        // this.setupForm();
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

    newItemFormInstance(): FormGroup {
        return HumiditySensorItemComponent.newFormInstance(this.formBuilder);
    }
}
