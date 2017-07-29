import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class GnssAntennaGroup extends LogItemGroup {

    readonly antennaTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaType"] input'));
    readonly serialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="serialNumber"] input'));
    readonly antennaReferencePointInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaReferencePoint"] input'));
    readonly markerArpEastEccInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="markerArpEastEcc"] input'));
    readonly markerArpUpEccInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="markerArpUpEcc"] input'));
    readonly markerArpNorthEccInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="markerArpNorthEcc"] input'));
    readonly alignmentFromTrueNorthInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="alignmentFromTrueNorth"] input'));
    readonly antennaRadomeTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaRadomeType"] input'));
    readonly radomeSerialNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="radomeSerialNumber"] input'));
    readonly antennaCableTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="antennaCableType"] input'));
    readonly antennaCableLengthInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="antennaCableLength"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('GNSS Antenna');
    }
}
