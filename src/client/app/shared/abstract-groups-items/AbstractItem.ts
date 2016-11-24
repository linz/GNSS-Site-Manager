import { GeodesyEvent, EventNames } from '../events-messages/Event';
import { EventEmitter, DoCheck  } from '@angular/core';

export abstract class AbstractItem implements DoCheck {
  protected isNew: boolean = false;

  protected isOpen: boolean = true;

  /**
   * Keep a copy of the last GeodesyEvent so can detect when it has changed nad have a new event.
   *
   * @type {{name: EventNames}}
   */
  private lastGeodesyEvent: GeodesyEvent = {name: EventNames.none};


  /**
   * Get the (@Output) GeodesyEvent used to communicate from parent to child.
   */
  abstract getGeodesyEvent(): GeodesyEvent;

  /**
   * Get the index of the item.
   */
  abstract getIndex(): number;

  /**
   * Get the @Output returnEvents endpoint for the child to send events to the parent
   */
  abstract getReturnEvents(): EventEmitter<GeodesyEvent>;


  /**
   * Angular doesn't detect changes in objects and need to perform the check with this lifecycle hook ourselves.
   *
   * We use it to receive events / messages from the parent component
   */
  ngDoCheck(): void {
    this.detectHandleGeodesyEvents();
  }

  detectHandleGeodesyEvents() {
    if (this.getGeodesyEvent().name !== this.lastGeodesyEvent.name) {
      this.copyEventToLast();
      console.log('child event: ', EventNames[this.getGeodesyEvent().name]);
      switch (this.getGeodesyEvent().name) {
        case EventNames.newItem:
          this.newItem(this.getGeodesyEvent().valueNumber);
          break;

        default:
          console.log('Child component - unhandled event: ', EventNames[this.getGeodesyEvent().name]);
      }
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
    }
  }

  /**
   * Keep a lastGeodesyEvent so can see in ngDoCheck() if the event has changed
   */
  private copyEventToLast() {
    this.lastGeodesyEvent.name = this.getGeodesyEvent().name;
    this.lastGeodesyEvent.valueNumber = this.getGeodesyEvent().valueNumber;
    this.lastGeodesyEvent.valueObject = this.getGeodesyEvent().valueObject;
    this.lastGeodesyEvent.valueString = this.getGeodesyEvent().valueString;
  }

  removeItem(index: number) {
    console.log('child call removeItem(' + index + ')');
    let geodesyEvent: GeodesyEvent = {name: EventNames.removeItem, valueNumber: index};
    this.getReturnEvents().emit(geodesyEvent);
  }


  /* ===============================================================
   * Utility Methods
   * TODO - move duplicates to common base class
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
