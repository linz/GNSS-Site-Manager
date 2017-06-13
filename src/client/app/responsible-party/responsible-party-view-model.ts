import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { ObjectMap } from '../shared/json-data-view-model/data-view-translator';

export class ResponsiblePartyViewModel extends AbstractViewModel {
    /**
     * Not the best form making fields public, however saves clutter of creating accessors / getters for all
     */
    public individualName: string = null;
    public organisationName: string = null;
    public positionName: string = null;
    public deliveryPoint: string = null;
    public city: string = null;
    public administrativeArea: string = null;
    public postalCode: string = null;
    public country: string = null;
    public email: string = null;
    public phone: string = null;
    public fax: string = null;

    constructor() {
        super();
    }

    public getObjectMap(): ObjectMap {
        throw new Error('Not supported');
    }

    createFieldMappings(): void {
    }
}
