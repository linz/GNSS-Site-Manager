import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';

/**
 * This component represents a single Local Episodic Effect.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effect-item',
    templateUrl: 'local-episodic-effect-item.component.html',
})
export class LocalEpisodicEffectItemComponent extends AbstractItem {
    public miscUtils: any = MiscUtils;

    /**
     * Total number of localEpisodicEffects
     */
    @Input() total: number;
    /**
     * The index of this sensor (zero-based)
     */
    @Input() index: number;
    /**
     * The LocalEpisodicEffect in question.
     */
    @Input() localEpisodicEffect: LocalEpisodicEffectViewModel;

    /**
     * This is to receive geodesyEvent from parent.
     */
    @Input() geodesyEvent: GeodesyEvent;

    /**
     * Events children components can send to their parent components.  Usually these are then passed to all
     * child components.
     * @type {EventEmitter<boolean>}
     */
    @Output() returnEvents = new EventEmitter<GeodesyEvent>();

    constructor(protected dialogService: DialogService) {
        super(dialogService);
    }

    getGeodesyEvent(): GeodesyEvent {
        return this.geodesyEvent;
    }

    getIndex(): number {
        return this.index;
    }

    getReturnEvents(): EventEmitter<GeodesyEvent> {
        return this.returnEvents;
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }
}
