import { EventEmitter, OnInit, Input, Output, OnChanges, SimpleChange, ChangeDetectorRef, Injector } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { DialogService } from '../index';
import { MiscUtils } from '../global/misc-utils';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';

export class ItemControls {
    itemControls: [ItemControl];

    constructor(itemControls: [ItemControl]) {
        this.itemControls = itemControls;
    }
}

export interface ItemControl {
    [name: string]: AbstractControl;
}

export abstract class AbstractItem implements OnInit, OnChanges {
    protected miscUtils: any = MiscUtils;

    protected itemGroup: FormGroup;

    @Input('groupArray') groupArray: FormArray;

    /**
     * The index of this sensor (zero-based)
     */
    @Input() index: number;

    /**
     * Total number of Frequency Standards
     */
    @Input() total: number;

    /**
     * This is to receive geodesyEvent from parent.
     */
    @Input() geodesyEvent: GeodesyEvent;

    /**
     * Events children components can send to their parent components. Usually these are then passed to all
     * child components.
     * @type {EventEmitter<boolean>}
     */
    @Output() returnEvents = new EventEmitter<GeodesyEvent>();

    protected isNew: boolean = false;
    protected isOpen: boolean = false;

    /**
     * Get the index of the item.
     */
    getIndex(): number {
        return this.index;
    }

    /**
     * Get the 1-based index number.
     */
    getItemNumber(): number {
        return this.index+1;
    }

    getGeodesyEvent(): GeodesyEvent {
        return this.geodesyEvent;
    }

    getReturnEvents(): EventEmitter<GeodesyEvent> {
        return this.returnEvents;
    }

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    /**
     * Get the ViewModel used in the Item components
     */
    abstract getItem(): AbstractViewModel;

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    abstract getFormControls(): ItemControls;

    /**
   * Creates an instance of the AbstractItem with the injected Services.
   *
   * @param {DialogService} dialogService - The injected DialogService.
   */
    constructor(protected dialogService: DialogService) { }

    ngOnInit() {
        this.isOpen = this.getIndex() === 0;
    }

    /**
     * Deteect changes in @Inputs and delegate to handlers
     * @param changes sent by the NG Framework
     */
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        // console.log(`ngOnChanges for item: ${this.index}`);
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            if (changedProp.isFirstChange()) {
                // console.log(`Item index ${this.index} - initial value of ${propName} set to: `, changedProp);
                if (propName === 'geodesyEvent') {
                    this.handleGeodesyEvents();
                }
            }
        }
    }

    handleGeodesyEvents() {
            // console.log('child event for item index: '+this.index+': ', EventNames[this.getGeodesyEvent().name]);
            switch (this.getGeodesyEvent().name) {
                case EventNames.newItem:
                    this.newItem(this.getGeodesyEvent().valueNumber);
                    break;
                case EventNames.none:
                    break;
                default:
                    console.log('Child component - unhandled event: ', EventNames[this.getGeodesyEvent().name]);
            }
    }

    /**
     * Remove an item from the UI and delete if it is an existing record.
     */
    removeItem(index: number) {
      let deleteReason: string = 'New item not needed';

      if (this.isNew) {
        this.cancelNew(index, deleteReason);
      } else {
          this.dialogService.confirmDeleteDialog(
            this.getItemName(),
            (deleteReason : string) => {
               // ok callback
               this.deleteItem(index, deleteReason);
                this.itemGroup.markAsDirty();
            },
            () => {
              // cancel callback
              console.log('delete cancelled by user');
            }
          );
      }
      return false; // same as 'event.preventDefault()` (which I'm having trouble as cant get event parameter)
    }

    getRemoveOrDeletedText(): string {
        return this.isNew ? 'Cancel' : 'Delete';
    }

    public isFormDirty(): boolean {
        // console.debug(`abstractitem - isFormDirty - dirty: ${this.itemGroup.dirty}, status: ${this.itemGroup.status}`);
        return this.itemGroup ? (this.itemGroup.dirty || this.isNew) : false;
    }

    public isFormInvalid(): boolean {
        return this.itemGroup ? ! this.itemGroup.valid : false;
    }

    /**
     * Add the itemGroup (the item) to the array (groupArray).
     * @param itemGroup to add
     */
    addToGroupArray(itemGroup: FormGroup): void {
        this.groupArray.insert(0, itemGroup);
        console.warn(`AbstractItem (${this.getItemName()}) - addToGroupArray - groupArray size now: ${this.groupArray.length}`);
    }

    /**
     * Patching (or setting) is used to apply the values in the model to the form.
     */
    protected patchForm() {
        console.log(`${this.getItemName()} #${this.index} - setValue: `, this.getItem());
        this.itemGroup = <FormGroup> this.groupArray.at(this.index);
        this.addFields(this.itemGroup, this.getFormControls());
        // For some reason, when - Open Group, Open Item, Close Group, Reopen Group, it is being marked as dirty
        // NOTE that without the setTimeout() on the setValue(), a "was false now true" error occurs.  It seems that
        // it is talking about the dirty status.  So something is happening deep in the angular lifecycle.  Hopefully
        // they fix this.
        // Check its dirty status before doing the setValue() and restore to that state afterwards
        let wasDirty: boolean = this.itemGroup ? this.itemGroup.dirty : true;   // True because it is new
        setTimeout(()=>{this.itemGroup.setValue(this.getItem())});
        if (! wasDirty) {
            setTimeout(()=>{this.itemGroup.markAsPristine()});
        }
    }

    /**
     * Event Handler - if this item has the given indexOfNew, then this is a new item.
     *
     * @param indexOfNew
     */
    private newItem(indexOfNew: number) {
        if (this.getIndex() === indexOfNew) {
            this.isNew = true;
            this.isOpen = true;
        } else {
            // close all others
            this.isNew = false;
            this.isOpen = false;
        }
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    private deleteItem(index: number, deleteReason : string) {
        console.log('child call removeItem(' + index + ')');
        let geodesyEvent: GeodesyEvent = {name: EventNames.removeItem, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
    }

    /**
     *  Mark an item for deletion using the specified reason.
     */
    private cancelNew(index: number, deleteReason : string) {
        console.log('child call cancelNew(' + index + ')');
        let geodesyEvent: GeodesyEvent = {name: EventNames.cancelNew, valueNumber: index, valueString: deleteReason};
        this.getReturnEvents().emit(geodesyEvent);
        this.isNew = false;
    }

    /**
     * When the group is setup, blank FormGroups for the contained Items are created (no controsl).  This method populates the
     * Item's FormGroup with the controls (typically before patching in values).
     *
     * @param itemGroup is the container for the Item's form controls.  It may or may not already contain Form AbstractControls.
     * @param formControls is an array of objects containing the forms AbstractControls to add to the itemGroup.
     */
    private addFields(itemGroup: FormGroup, formControls: ItemControls) {
        if (Object.keys(this.itemGroup.controls).length === 0) {
            for (let control of formControls.itemControls) {
                let key: any = Object.keys(control)[0];
                let value: AbstractControl = control[key];
                console.debug(`add control to ${this.getItemName()} - "${key}":`, value);
                itemGroup.addControl(key, value);
            }
        }
    }
}
