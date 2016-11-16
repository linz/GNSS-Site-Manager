import { GeodesyEvent, EventNames } from './Event';
export abstract class SensorsGroupBase {
  isGroupOpen: boolean = true;
  hasGroupANewItem: boolean = false;

  abstract getItemsCollection(): any;

  abstract setItemsCollection(any): void;

  abstract getItemsOriginalCollection(): any;

  abstract getGeodesyEvent(): GeodesyEvent;

  /**
   * Add a new item
   */
  abstract addNew();


  /* **************************************************
   * Events received from and sent to children.
   *
   * returnEvents() is the handler called and it calls the below methods.
   * In each of these methods it sets values on the GeodesyEvent object and the
   * children receive notice of this change and use it as an event driver.
   */
  private eventValidation(childComponetIndex: number) {
    if (childComponetIndex < 0 || childComponetIndex >= this.getItemsCollection().length) {
      throw new Error('open/closes event - index is outside range of 0 to (<) ' +
        this.getItemsCollection().length + ': ' + childComponetIndex);
    }
  }

  private openAboveEvent(childComponetIndex: number) {
    console.log('parent openAboveEvent - ', childComponetIndex);
    this.eventValidation(childComponetIndex);
    let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
    geodesyEvent.name = EventNames.openAbove;
    geodesyEvent.valueNumber = childComponetIndex;
  }

  private closeAboveEvent(childComponetIndex: number) {
    console.log('parent closeAboveEvent - ', childComponetIndex);
    this.eventValidation(childComponetIndex);
    let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
    geodesyEvent.name = EventNames.closeAbove;
    geodesyEvent.valueNumber = childComponetIndex;
  }

  private openBelowEvent(childComponetIndex: number) {
    console.log('parent openBelowEvent - ', childComponetIndex);
    this.eventValidation(childComponetIndex);
    let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
    geodesyEvent.name = EventNames.openBelow;
    geodesyEvent.valueNumber = childComponetIndex;
  }

  private closeBelowEvent(childComponetIndex: number) {
    console.log('parent closeBelowEvent - ', childComponetIndex);
    this.eventValidation(childComponetIndex);
    let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
    geodesyEvent.name = EventNames.closeBelow;
    geodesyEvent.valueNumber = childComponetIndex;
  }

  /**
   * This is the event handler called by children
   * @param geodesyEvent
   */
  returnEvents(geodesyEvent: GeodesyEvent) {
    // this.eventValidation(childComponetIndex);  TODO this
    console.log('Parent - returnEvent: ', geodesyEvent);

    switch (geodesyEvent.name) {
      case EventNames.openAbove:
        this.openAboveEvent(geodesyEvent.valueNumber);
        break;
      case EventNames.openBelow:
        this.openBelowEvent(geodesyEvent.valueNumber);
        break;
      case EventNames.closeAbove:
        this.closeAboveEvent(geodesyEvent.valueNumber);
        break;
      case EventNames.closeBelow:
        this.closeBelowEvent(geodesyEvent.valueNumber);
        break;
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
