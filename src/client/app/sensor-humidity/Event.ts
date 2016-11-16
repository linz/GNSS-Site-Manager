export enum EventNames {
  none,
  newSensor,
  removeItem,
  openAbove,
  openBelow,
  closeAbove,
  closeBelow,
}
export interface GeodesyEvent {
  name: EventNames;
  // Pass the data that is relevant for the event
  valueNumber?: number;
  valueString?: string;
  valueObject?: any;
}
