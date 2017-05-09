import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';

// Enum version wouldn't work in templates.  Can't have strings in enums.
export class ResponsiblePartyType {
    static siteOwner = new ResponsiblePartyType('siteOwner', 'Site Owner');
    static siteContact = new ResponsiblePartyType('siteContact', 'Site Contact');
    static siteMetadataCustodian = new ResponsiblePartyType('siteMetadataCustodian', 'Site Metadata Custodian');
    static siteDataCenter = new ResponsiblePartyType('siteDataCenter', 'Site Data Center');
    static siteDataSource = new ResponsiblePartyType('siteDataSource', 'Site Data Source');

    constructor(private value: string, private title: string) {
    }

    getObjectName(): string {
        return this.value;
    }

    getTitle(): string {
        return this.title;
    }
}

/**
 * This class represents the responsible parties, which have 5 different types.
 * This group will contain each one as its items (even if it has only 1 item).
 *
 * 1. Site Owner: mandatory, 1 only (object)
 * 2. Site Contact: mandatory, multiple (array)
 * 3. Site Metadata Custodian: mandatory, 1 only (object)
 * 4. Site Date Center: optional, multiple (array)
 * 5. Site Date Source: optional, 1 only (object)
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-group',
    templateUrl: 'responsible-party-group.component.html',
})
export class ResponsiblePartyGroupComponent extends AbstractGroupComponent<ResponsiblePartyViewModel> {

    @Input() isMandatory: boolean;
    @Input() isMultiple: boolean;
    private _partyName: ResponsiblePartyType;

    static compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        let name1: string = obj1.individualName;
        let name2: string = obj2.individualName;
        return name1.localeCompare(name2);
    }

    @Input()
    set partyType(partyType: ResponsiblePartyType) {
        this._partyName = partyType;
    }

    get partyType(): ResponsiblePartyType {
        return this._partyName;
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel[this.partyType.getObjectName()]);
            this.init();
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel[this.partyType.getObjectName()]);
        }
    }

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return this.partyType.getTitle();
    }

    getControlName(): string {
        return this.partyName.toString();
    }

    compare(obj1: ResponsiblePartyViewModel, obj2: ResponsiblePartyViewModel): number {
        return ResponsiblePartyGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): ResponsiblePartyViewModel {
        return new ResponsiblePartyViewModel(blank);
    }

    private init() {
        if (!this.partyType) {
            throw new Error('Party attribute is required for ResponsiblePartyGroupComponent');
        } else {
        }

        this.setupForm(this.partyType.getObjectName());
    }
}
