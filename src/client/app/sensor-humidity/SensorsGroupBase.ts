import { GeodesyEvent, EventNames } from './Event';
export abstract class SensorsGroupBase {
  isGroupOpen: boolean = true;
  hasGroupANewItem: boolean = false;

  abstract getItemsCollection(): any;

  abstract setItemsCollection(collection: any[]): void;

  abstract getItemsOriginalCollection(): any;

  abstract getGeodesyEvent(): GeodesyEvent;

  /**
   * Add a new item
   */
  abstract addNew(): void;

  /**
   * This is the event handler called by children
   * @param geodesyEvent
   */
  returnEvents(geodesyEvent: GeodesyEvent) {
    console.log('Parent - returnEvent: ', geodesyEvent);

    switch (geodesyEvent.name) {
      case EventNames.removeItem:
        this.removeItem(geodesyEvent.valueNumber);
        break;
      default:
        console.log('returnEvents - unknown event: ', EventNames[geodesyEvent.name]);
    }
  }

  /**
   * Remove an item from the list
   */
  public removeItem(itemIndex: number) {
    console.log('parent - remove sensor item: ', itemIndex);
    this.getItemsCollection().splice(itemIndex, 1);
    this.getItemsOriginalCollection().splice(itemIndex, 1);
  }

  /** ===============================================================
   *     Helper methods
   *  ===============================================================
   */

  /**
   * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDThh:mm:ssZ)
   */
  public getDate(datetime: string) {
    if (datetime === null || typeof datetime === 'undefined') {
      return '';
    } else if (datetime.length < 10) {
      return datetime;
    }
    return datetime.substring(0, 10);
  }
}
