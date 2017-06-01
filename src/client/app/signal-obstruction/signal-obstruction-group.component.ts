import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SignalObstructionViewModel } from './signal-obstruction-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
    moduleId: module.id,
    selector: 'signal-obstructions-group',
    templateUrl: 'signal-obstruction-group.component.html',
})
export class SignalObstructionGroupComponent extends AbstractGroupComponent<SignalObstructionViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Signal Obstruction';
    }

    getControlName(): string {
        return 'signalObstructions';
    }

    newItemViewModel(): SignalObstructionViewModel {
        return new SignalObstructionViewModel();
    }
}
