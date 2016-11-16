import { GeodesyEvent, EventNames } from './Event';
import { EventEmitter, DoCheck  } from '@angular/core';

export abstract class SensorItemBase implements DoCheck {
  protected isNew: boolean = false;

  isOpen: boolean = true;

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
   * Keep a copy of the last GeodesyEvent so can detect when it has changed nad have a new event.
   * 
   * @type {{name: EventNames}}
   */
  private lastGeodesyEvent: GeodesyEvent = {name: EventNames.none};

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
        case EventNames.openAbove:
          this.openIfAbove(this.getGeodesyEvent().valueNumber);
          break;
        case EventNames.openBelow:
          this.openIfBelow(this.getGeodesyEvent().valueNumber);
          break;
        case EventNames.closeAbove:
          this.closeIfAbove(this.getGeodesyEvent().valueNumber);
          break;
        case EventNames.openBelow:
          this.openIfBelow(this.getGeodesyEvent().valueNumber);
          break;
        case EventNames.closeBelow:
          this.closeIfBelow(this.getGeodesyEvent().valueNumber);
          break;
        case EventNames.newSensor:
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


  /**
   * The methods in the child component that handles an open event.
   * @param ifAboveThisIndex
   */
  private openIfAbove(ifAboveThisIndex: number) {
    if (this.getIndex() < ifAboveThisIndex) {
      this.isOpen = true;
    }
  }

  /**
   * The methods in the child component that handles a close event.
   * @param ifAboveThisIndex
   */
  private closeIfAbove(ifAboveThisIndex: number) {
    if (this.getIndex() < ifAboveThisIndex) {
      this.isOpen = false;
    }
  }

  /**
   * The methods in the child component that handles an open event.
   * @param ifBelowThisIndex
   */
  private openIfBelow(ifBelowThisIndex: number) {
    if (this.getIndex() > ifBelowThisIndex) {
      this.isOpen = true;
    }
  }

  /**
   * The methods in the child component that handles a close event.
   * @param ifBelowThisIndex
   */
  private closeIfBelow(ifBelowThisIndex: number) {
    if (this.getIndex() > ifBelowThisIndex) {
      this.isOpen = false;
    }
  }

  /**
   * Tell the parent and then the siblings below this component to open
   * @param index
   */
  public openBelow(index: number) {
    console.log('child call openBelow(' + index + ')');
    let geodesyEvent: GeodesyEvent = {name: EventNames.openBelow, valueNumber: index};
    this.getReturnEvents().emit(geodesyEvent);
  }

  /**
   * Tell the parent and then the siblings below this component to open
   * @param index
   */
  public closeBelow(index: number) {
    console.log('child call closeBelow(' + index + ')');
    let geodesyEvent: GeodesyEvent = {name: EventNames.closeBelow, valueNumber: index};
    this.getReturnEvents().emit(geodesyEvent);
  }

  /**
   * Tell the parent and then the siblings abpve this component to open
   * @param index
   */
  public openAbove(index: number) {
    console.log('child call openAbove(' + index + ')');
    let geodesyEvent: GeodesyEvent = {name: EventNames.openAbove, valueNumber: index};
    this.getReturnEvents().emit(geodesyEvent);
  }

  /**
   * Tell the parent and then the siblings abpve this component to open
   * @param index
   */
  public closeAbove(index: number) {
    console.log('child call closeAbove(' + index + ')');
    let geodesyEvent: GeodesyEvent = {name: EventNames.closeAbove, valueNumber: index};
    this.getReturnEvents().emit(geodesyEvent);
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
