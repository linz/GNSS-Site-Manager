import {GeodesyEvent, EventNames} from '../../sensor-humidity/Event';
export abstract class AbstractGroup {
  isGroupOpen: boolean = true;
  hasGroupANewItem: boolean = false;

  abstract getItemsCollection(): any;

  abstract setItemsCollection(collection: any[]): void;

  abstract getItemsOriginalCollection(): any;

  abstract getGeodesyEvent(): GeodesyEvent;

  /**
   * Return the comparator used to sort the collection.  There are simple options in here such as:
   * - comparatorEffectiveStartDates
   * - comparatorDateInstalled
   *
   */
  abstract getComparator(): any;

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


  /** ===============================================================
   *     Comparators and other sorting
   *  ===============================================================
   */

  /**
   * Use the Geodesy object defined comparator in getComparator() to sort the given collection inline.
   *
   * @param collection
   */
  sortUsingComparator(collection: any[]) {
    collection.sort(this.getComparator);
  }

  /**
   * This is used in comparators but isn't a comparator - just a helper function.  In the comparator, extract the dates
   * (using getDateInstalled(), getBeginPositionDate(), ...) and return compareDates(date1, date2)
   * @param date1
   * @param date2
   * @return -1: date1 < date2; 1: date1 > date2; 0: date1 == date2
   */
  public compareDates(date1: string, date2: string): number {
    if (date1 < date2) {
      return 1;
    } else if (date1 > date2) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Comparator for sorting by object.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0].
   * @param obj1
   * @param obj2
   * @returns {number}
   */
  comparatorEffectiveStartDates(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = this.getBeginPositionDate(obj1);
      let date2: string = this.getBeginPositionDate(obj2);
      return this.compareDates(date1, date2);
    }
  }

  /**
   * Comparator for sorting by object.dateInstalled.value[0].
   * @param obj1
   * @param obj2
   * @returns {number}
   */
  comparatorDateInstalled(obj1: any, obj2: any) {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = this.getDateInstalled(obj1);
      let date2: string = this.getDateInstalled(obj2);
      return this.compareDates(date1, date2);
    }
  }

  /**
   * Retrieve the obj.dateInstalled.value[0] or '' if no parts of the path exists.
   * @param obj
   * @returns {any}
   */
  public getDateInstalled(obj: any) {
    if (obj && obj.dateInstalled
      && obj.dateInstalled.value
      && obj.dateInstalled.length > 0) {
      return obj.dateInstalled.value[0];
    } else {
      return '';
    }
  }

  /**
   * Retrieve the obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] or '' if no parts of
   * the path exists.
   * @param obj
   * @returns {any}
   */
  public getBeginPositionDate(obj: any) {
    if (obj && obj.validTime && obj.validTime.abstractTimePrimitive && obj.validTime.abstractTimePrimitive['gml:TimePeriod']
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value
      && obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value.length > 0) {
      return obj.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0];
    }
  }
}
