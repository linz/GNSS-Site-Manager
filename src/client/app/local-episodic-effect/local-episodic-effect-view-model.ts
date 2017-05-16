import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class LocalEpisodicEffectViewModel extends AbstractViewModel {
    public event: string;

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();
        this.event = '';
    }

    createFieldMappings(): void {
        this.addFieldMapping('/localEpisodicEffect/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/localEpisodicEffect/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/localEpisodicEffect/event', 'string',
            '/event', 'string');
    };
}
