import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

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

    createFieldMappings(): void {
        this.addFieldMapping('/ciResponsibleParty/individualName/characterString/gco:CharacterString',
            'string', '/individualName', 'string');
        this.addFieldMapping('/ciResponsibleParty/organisationName/characterString/gco:CharacterString',
            'string', '/organisationName', 'string');
        this.addFieldMapping('/ciResponsibleParty/positionName/characterString/gco:CharacterString',
            'string', '/positionName', 'string');

        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/address/ciAddress/deliveryPoint/0/' +
            'characterString/gco:CharacterString',
            'string', '/deliveryPoint', 'string');

        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/address/ciAddress/city/characterString/gco:CharacterString',
            'string', '/city', 'string');
        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/address/ciAddress/administrativeArea/' +
            'characterString/gco:CharacterString', 'string', '/administrativeArea', 'string');
        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/address/ciAddress/postalCode/characterString/gco:CharacterString',
            'string', '/postalCode', 'string');
        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/address/ciAddress/city/country/characterString/gco:CharacterString',
            'string', '/country', 'string');

        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/address/ciAddress/electronicMailAddress/0/' +
            'characterString/gco:CharacterString',
            'string', '/email', 'string');

        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/phone/ciTelephone/voice/0/' +
            'characterString/gco:CharacterString',
            'string', '/phone', 'string');

        this.addFieldMapping('/ciResponsibleParty/contactInfo/ciContact/phone/ciTelephone/facsimile/0/' +
            'characterString/gco:CharacterString',
            'string', '/fax', 'string');
    };

    /**
     * Overridden parent method to return false because ResponsibleParty does not have an end date.
     */
    hasEndDateField(): boolean {
        return false;
    }
}
