import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { LocalEpisodicEffectItemComponent } from './local-episodic-effect-item.component';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effects-group',
    templateUrl: 'local-episodic-effects-group.component.html',
})
export class LocalEpisodicEffectsGroupComponent extends AbstractGroup<LocalEpisodicEffectViewModel> implements OnInit {
    static compare(obj1: LocalEpisodicEffectViewModel, obj2: LocalEpisodicEffectViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.localEpisodicEffects);
            this.setupForm('localEpisodicEffects');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.localEpisodicEffects);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set in the @Input
        // this.setupForm();
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    compare(obj1: LocalEpisodicEffectViewModel, obj2: LocalEpisodicEffectViewModel): number {
        return LocalEpisodicEffectsGroupComponent.compare(obj1, obj2);
    }

        /* **************************************************
         * Other methods
         */
    newItemViewModel(blank?: boolean): LocalEpisodicEffectViewModel {
        return new LocalEpisodicEffectViewModel(blank);
    }

    newItemFormInstance(): FormGroup {
        return LocalEpisodicEffectItemComponent.newFormInstance(this.formBuilder);
    }
}
