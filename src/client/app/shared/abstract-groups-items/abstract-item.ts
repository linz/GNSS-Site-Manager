import { EventEmitter, OnInit, Input, Output, OnChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { DialogService } from '../index';
import { MiscUtils } from '../global/misc-utils';
import { AbstractGroup } from './abstract-group';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';

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
   * Creates an instance of the AbstractItem with the injected Services.
   *
   * @param {DialogService} dialogService - The injected DialogService.
   */
  constructor(protected dialogService: DialogService) {}

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
        return this.itemGroup ? this.itemGroup.dirty : false;
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
        console.log(`receivers #${this.index} - setValue: `, this.getItem());
        this.itemGroup = <FormGroup> this.groupArray.at(this.index);
        this.itemGroup.setValue(this.getItem())
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
}
