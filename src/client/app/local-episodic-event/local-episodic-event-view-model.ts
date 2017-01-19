import {AbstractViewModel} from '../shared/json-data-view-model/view-model/abstract-view-model';
import {MiscUtils} from '../shared/global/misc-utils';

export class LocalEpisodicEventViewModel extends AbstractViewModel {
    /**
     * Not the best form making private fields public, however saves clutter of creating accessors / getters for all
     */
    public startDate: string;
    public endDate: string;

    public event: string;

    constructor() {
        super();
        let presentDT: string = MiscUtils.getPresentDateTime();

        this.startDate = presentDT;
        this.endDate = '';
        this.event = '';
    }

    createFieldMappings(): void {
        this.addFieldMapping('/localEpisodicEvents/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'string');

        this.addFieldMapping('/localEpisodicEvents/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'string');

        this.addFieldMapping('/localEpisodicEvents/event', 'string',
            '/event', 'string');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        let presentDT: string = MiscUtils.getPresentDateTime();

        this.endDate = presentDT;
    }
}
