import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effects-group',
    templateUrl: 'local-episodic-effects-group.component.html',
})
export class LocalEpisodicEffectsGroupComponent extends AbstractGroup<LocalEpisodicEffectViewModel> implements OnInit {
    @Input()
    set siteLogModel(siteLogModel: any) {
        siteLogModel && this.setItemsCollection(siteLogModel.localEpisodicEvents);
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.localEpisodicEvents);
    }

    constructor() {
        super();
    }

    ngOnInit() {
        this.setupForm();
    }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('localEpisodicEvents', this.groupArrayForm);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    compare(obj1: LocalEpisodicEffectViewModel, obj2: LocalEpisodicEffectViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(): LocalEpisodicEffectViewModel {
        return new LocalEpisodicEffectViewModel();
    }
}
