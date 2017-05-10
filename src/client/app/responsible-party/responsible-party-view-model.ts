import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class ResponsiblePartyViewModel extends AbstractViewModel {
    /**
     * Not the best form making fields public, however saves clutter of creating accessors / getters for all
     */
    public individualName: string = '';
    public organisationName: string = '';
    public positionName: string = '';
    public deliveryPoint: string = '';
    public city: string = '';
    public administrativeArea: string = '';
    public postalCode: string = '';
    public country: string = '';
    public email: string = '';
    public phone: string = '';
    public fax: string = '';

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
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
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     * Return what is changed as an object so the form can be patched.
     */
    setFinalValuesBeforeCreatingNewItem(): Object {
        // NOOP
        return {};
    }
}
