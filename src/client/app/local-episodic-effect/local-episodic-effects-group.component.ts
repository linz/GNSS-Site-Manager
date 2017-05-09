import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effects-group',
    templateUrl: 'local-episodic-effects-group.component.html',
})
export class LocalEpisodicEffectsGroupComponent extends AbstractGroupComponent<LocalEpisodicEffectViewModel> {
    static compare(obj1: LocalEpisodicEffectViewModel, obj2: LocalEpisodicEffectViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getControlName(): string {
        return 'localEpisodicEffects';
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
}
