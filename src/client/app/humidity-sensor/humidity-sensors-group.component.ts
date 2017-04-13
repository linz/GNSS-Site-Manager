import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';

/**.
 * This class represents a group of Humidity Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensors-group',
    templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends AbstractGroup<HumiditySensorViewModel> implements OnInit {
    @Input()
    set siteLogModel(siteLogModel: any) {
        siteLogModel && this.setItemsCollection(siteLogModel.humiditySensors);
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.humiditySensors);
    }

    constructor() {
        super();
    }

    ngOnInit() {
        this.setupForm();
    }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('humiditySensors', this.groupArrayForm);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    static compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    compare(obj1: HumiditySensorViewModel, obj2: HumiditySensorViewModel): number {
        return HumiditySensorsGroupComponent.compare(obj1, obj2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(blank?: boolean): HumiditySensorViewModel {
        return new HumiditySensorViewModel(blank);
    }
}
