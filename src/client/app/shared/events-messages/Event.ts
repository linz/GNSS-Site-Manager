export enum EventNames {
  none,
  newItem,
  removeItem,
}
export interface GeodesyEvent {
  name: EventNames;
  // Pass the data that is relevant for the event
  valueNumber?: number;
  valueString?: string;
  valueObject?: any;
}
