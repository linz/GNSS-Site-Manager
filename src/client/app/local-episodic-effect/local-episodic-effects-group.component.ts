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

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    getControlName(): string {
        return 'localEpisodicEffects';
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(blank?: boolean): LocalEpisodicEffectViewModel {
        return new LocalEpisodicEffectViewModel(blank);
    }
}
