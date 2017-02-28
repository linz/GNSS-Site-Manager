export enum EventNames {
    none,
    newItem,
    removeItem,
    cancelNew,
}
export class GeodesyEvent {
    constructor(name: EventNames) {
        this.name = name;
    }

    name: EventNames;
    // Pass the data that is relevant for the event
    valueNumber?: number;
    valueString?: string;
    valueObject?: any;
}
