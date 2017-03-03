import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import * as lodash from 'lodash';

export abstract class AbstractGroup<T extends AbstractViewModel> {
    isGroupOpen: boolean = false;
    hasGroupANewItem: boolean = false;

    /**
     * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
     * @type {{name: EventNames}}
     */
    private geodesyEvent: GeodesyEvent = {name: EventNames.none};

    /**
     * All the items (eg. HumiditySensors)
     */
    private itemProperties: T[];

    /**
     * A backup of the original list of items.  Used to diff against upon Save.
     */
    private itemOriginalProperties: T[];

    /**
     * This is used in comparators but isn't a comparator - just a helper function.  In the comparator, extract the dates
     * (using getDateInstalled(), getBeginPositionDate(), ...) and return compareDates(date1, date2)
     * @param date1
     * @param date2
     * @return -1: date1 < date2; 1: date1 > date2; 0: date1 == date2
     */
    public static compareDates(date1: string, date2: string): number {
        if (date1 < date2) {
            return -1;
        } else if (date1 > date2) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Get the item name to be used in the subclasses and displayed in the HTML.
     */
    abstract getItemName(): string;

    public addNewItem(): void {
        this.isGroupOpen = true;

        if (!this.getItemsCollection()) {
            this.setItemsCollection([]);
        }

        let newItem: T = <T> this.newViewModelItem();

        console.log('New View Model: ', newItem);

        // Add the new humidity sensor as current one
        this.addToItemsCollection(newItem);
        this.setInserted(newItem);

        if (this.itemProperties.length > 1) {
            // Let the ViewModels do anything they like with the previous item - such as set end/removal date
            this.itemProperties[this.itemProperties.length - 2].setFinalValuesBeforeCreatingNewItem();
        }
    }

    /**
     * The child class needs to define this to make an instance of itself.
     */
    abstract newViewModelItem(): T;

    /**
     * Subclasses can create a comparator relevant for their data structures.  Reduce size in these by
     * using getDateInstalled(), getBeginPositionDate.
     *
     * @param obj1
     * @param obj2
     */
    abstract compare(obj1: AbstractViewModel, obj2: AbstractViewModel): number;

    /**
     * Event mechanism to communicate with children.  Simply change the value of this and the children detect the change.
     *
     * @returns {GeodesyEvent}
     */
    getGeodesyEvent(): GeodesyEvent {
        return this.geodesyEvent;
    }

    getIsGroupOpen(): boolean {
        return this.isGroupOpen;
    }

    getHasGroupANewItem(): boolean {
        return this.hasGroupANewItem;
    }

    /**
     * Return collection - optionally with deleted items filter out.  Always in reverse order.  IT WILL NOT
     * change the original collection's order or composition.
     * @param showDeleted - false by default
     * @return {T[]}
     */
    getItemsCollection(showDeleted?: boolean): T[] {
        let doShowDeleted: boolean = false;
        if (showDeleted !== undefined) {
            doShowDeleted = showDeleted;
        }

        if (this.itemProperties) {
            let filteredOrNot: T[] = doShowDeleted ? lodash.clone(this.itemProperties) : this.itemProperties.filter(this.isntDeleted);
            let reversed: T[] = filteredOrNot.reverse();
            return reversed;
        } else {
            return [];
        }
    }

    getItemsOriginalCollection(): T[] {
        return this.itemOriginalProperties;
    }

    setItemsCollection(itemProperties: T[]) {
        this.itemProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemProperties);
        }
        console.debug(this.getItemName() + ' Collection sorted:', this.itemProperties);
    }

    setItemsOriginalCollection(itemProperties: T[]) {
        this.itemOriginalProperties = itemProperties;
        if (itemProperties && itemProperties.length > 0) {
            this.sortUsingComparator(this.itemOriginalProperties);
        }
    }

    addToItemsCollection(item: T) {
        // New items need to go at end of collection so the diff sees them as new
        this.itemProperties.push(item);
    }


    /**
     * This is the event handler called by children
     * @param geodesyEvent
     */
    returnEvents(geodesyEvent: GeodesyEvent) {
        console.log('Parent - returnEvent: ', geodesyEvent);

        switch (geodesyEvent.name) {
            case EventNames.removeItem:
                this.removeItem(geodesyEvent.valueNumber, geodesyEvent.valueString);
                break;
            case EventNames.cancelNew:
                this.cancelNew(geodesyEvent.valueNumber, geodesyEvent.valueString);
                break;
            default:
                console.log('returnEvents - unknown event: ', EventNames[geodesyEvent.name]);
        }
    }

    addNew() {
        this.addNewItem();
        this.newItemEvent();
    }

    /**
     * Remove an item.  Originally it was removed from the list.  However we now want to track deletes so
     * keep it and mark as deleted using change tracking.
     */
    public removeItem(itemIndex: number, reason: string) {
        console.log('parent - remove item: ', itemIndex);
        // Be aware that the default order is one way (low to high start date), but what is displayed is the opposite
        // (high to low start date).  This call is coming from the UI (the display order) and the default for
        // getItemsCollection() is the reverse order so this works out ok
        this.setDeletedReason(this.getItemsCollection()[itemIndex], reason);
        this.setDeleted(this.getItemsCollection()[itemIndex]);
    }

    /**
     * Permanently Remove an item.  Typically done when deleting an item just added and not yet persisted.
     */
    public cancelNew(itemIndex: number, reason: string) {
        console.log('parent - remove item Permanently: ', itemIndex);
        // Be aware that the default order is one way (low to high start date), but what is displayed is the opposite
        // (high to low start date).  Thus to access the original dataItems we need to reverse the index.
        let newIndex: number = this.itemProperties.length - itemIndex - 1;
        this.itemProperties.splice(newIndex, 1);
    }

    /**
     * Use the Geodesy object defined comparator in compare() to sort the given collection inline.
     *
     * @param collection
     */
    private sortUsingComparator(collection: any[]) {
        collection.sort(this.compare);
    }

    private isntDeleted(item: T): boolean {
        return (!item.dateDeleted || item.dateDeleted.length === 0);
    }

    /**
     * After a new item is created 'EventNames.newItem' is sent so that item can init itself.
     */
    private newItemEvent() {
        console.log('parent newItemEvent');
        let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
        geodesyEvent.name = EventNames.newItem;
        geodesyEvent.valueNumber = 0;
    }

    private setDeleted(item: T) {
        item.setDateDeleted();
    }

    private setInserted(item: T) {
        item.setDateInserted();
    }

    private setDeletedReason(item: T, reason: string) {
        item.setDeletedReason(reason);
    }
}
