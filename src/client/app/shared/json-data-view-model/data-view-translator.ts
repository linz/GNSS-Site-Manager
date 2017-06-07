import { MiscUtils } from '../global/misc-utils';
import * as _ from 'lodash';
import createMapper from 'map-factory';

/**
 * Tuple to assist in mapping data model to view model by defining one side of the relationship
 * pointer - Json Pointer path
 * type - type of the data defined at that path
 */
export class TypedPointer {
    constructor(public readonly pointer: string,
                public readonly type: string) {}
}

/**
 * Mapping to assist in mapping data model to view model by linking both sides.
 * A collection of these defines a complete (for the application) or partial (for just one or a few sections of data)
 * mapping to translate one of view or data model to the other.
 */
export class FieldMap {
    constructor(public readonly sourceField: TypedPointer,
                public readonly targetField: TypedPointer) {}

    public inverse(): FieldMap {
        return new FieldMap(this.targetField, this.sourceField);
    }
}

export class ObjectMap {

    private fieldMaps = new Array<FieldMap>();

    public inverse(): ObjectMap {
        let inverse = new ObjectMap();
        _.forEach(this.fieldMaps, f => {
            inverse.add(f.inverse());
        });
        return inverse;
    }

    public add(fieldMap: FieldMap) {
        this.fieldMaps.push(fieldMap);
    }

    // TODO: remove this getter once object translate is implemented in ObjectMap
    public getFieldMaps(): FieldMap[] {
        return this.fieldMaps;
    }
}

export class DataViewTranslatorService {

    /**
     * Generic translate independant of view and data models. As long as the mappings are in the source, the data will be
     * written into the mapped location in the target.
     *
     * @param source - source to read from
     * @param target - target to write to
     */
    static translate(source: any, target: any, objectMap: ObjectMap) {
        let mapper = createMapper({ alwaysTransform: true, alwaysSet: true });

        for (let fieldMap of objectMap.getFieldMaps()) {
            let sourcePath = DataViewTranslatorService.toDotNotation(fieldMap.sourceField.pointer);
            let targetPath = DataViewTranslatorService.toDotNotation(fieldMap.targetField.pointer) + '?';

            mapper.map(sourcePath).to(targetPath, (source: any) => {

                // TODO tidy up the logic in this block
                // especially if/when we refactor the field mapping in the models

                // Handle Point mappings
                if (fieldMap.sourceField.type === 'point_data') {
                    if (fieldMap.sourceField.pointer.match(/cartesianPosition/)) {
                        return this.translateCartesianPosition(source, {viewToData: false});
                    } else if (fieldMap.sourceField.pointer.match(/geodeticPosition/)) {
                        return this.translateGeodeticPosition(source, {viewToData: false});
                    } else {
                        throw new Error(`DataViewTranslatorService - unknown sourceField.pointer: 
                        ${fieldMap.sourceField.pointer} for sourceField.type: ${fieldMap.sourceField.type}`);
                    }
                } else if (fieldMap.sourceField.type === 'point_view') {
                    if (fieldMap.sourceField.pointer.match(/cartesianPosition/)) {
                        return this.translateCartesianPosition(source, {viewToData: true});
                    } else if (fieldMap.sourceField.pointer.match(/geodeticPosition/)) {
                        return this.translateGeodeticPosition(source, {viewToData: true});
                    } else {
                        throw new Error(`DataViewTranslatorService - unknown sourceField.pointer: 
                        ${fieldMap.sourceField.pointer} for sourceField.type: ${fieldMap.sourceField.type}`);
                    }

                }

                // specially handle undefined, note I think this needs to be here for number types but not certain
                if (source === undefined) {
                    return null;
                }
                // special handling for string types to handle missing values
                if (typeof source === 'string' && fieldMap.sourceField.type === 'string' && !source) {
                    return null;
                }
                // format a date type iff it has a value
                if (typeof source === 'string' && fieldMap.sourceField.type === 'date' && source) {
                    return MiscUtils.formatUTCDateTime(source as string);
                }

                return source;
            });
        }

        let result = mapper.execute(source, target);
        _.merge(target, result);
    }

    /**
     * CartesianPosition and GeodeticPosition are Point type with 3 values, and it can be optional and due to the XML schema, we achieve
     * this by having do data for the Positions.  Here are the mappings:
     *
     * /point/pos/value/0 -> /cartesianPosition_x
     * /point/pos/value/1 -> /cartesianPosition_y
     * /point/pos/value/2 -> /cartesianPosition_z
     * @param source (be that data from the View or Data)
     * @param viewToDataTranslateOptions - {viewToData: boolean} - default is {viewToData: true}
     * @return the translated value for the top-level CartesianPosition or GeodeticPosition
     */
    static translateCartesianPosition(source: any, viewToDataTranslateOptions?: { viewToData: boolean }): any {
        let mapper = createMapper({alwaysTransform: true, alwaysSet: true});
        if (viewToDataTranslateOptions
            && viewToDataTranslateOptions.hasOwnProperty('viewToData')
            && !viewToDataTranslateOptions['viewToData']) {
            // data to view translate
            if (! source || (typeof source === 'object' && !source.hasOwnProperty('point'))) {
                // ! source happens when the CartesianPosition or GeodeticPosition elements dont exist
                return {cartesianPosition_x: null, cartesianPosition_y: null, cartesianPosition_z: null};
            } else {
                mapper.map('point.pos.value[0]').to('cartesianPosition_x');
                mapper.map('point.pos.value[1]').to('cartesianPosition_y');
                mapper.map('point.pos.value[2]').to('cartesianPosition_z');
                return mapper.execute(source);
            }
        }
        // view  to data translate
        if (!source || (source.hasOwnProperty('cartesianPosition_x') && source.cartesianPosition_x === null)
            || !source.hasOwnProperty('cartesianPosition_x')) {
            return {};
        } else {
            let value: string[] = [];

            value.push(source.cartesianPosition_x);
            value.push(source.cartesianPosition_y);
            value.push(source.cartesianPosition_z);
            mapper.map('value').to('point.pos.value');
            return mapper.execute({'value': value});
        }
    }

    /**
     * CartesianPosition and GeodeticPosition are Point type with 3 values, and it can be optional and due to the XML schema, we achieve
     * this by having do data for the Positions.  Here are the mappings:
     *
     * /point/pos/value/0 -> /geodeticPosition_lat
     * /point/pos/value/1 -> /geodeticPosition_long
     * /point/pos/value/2 -> /geodeticPosition_height
     * @param source (be that data from the View or Data)
     * @param viewToDataTranslateOptions - {viewToData: boolean} - default is {viewToData: true}
     * @return the translated value for the top-level CartesianPosition or GeodeticPosition
     */
    static translateGeodeticPosition(source: any, viewToDataTranslateOptions?: { viewToData: boolean }): any {
        let mapper = createMapper({alwaysTransform: true, alwaysSet: true});
        if (viewToDataTranslateOptions
            && viewToDataTranslateOptions.hasOwnProperty('viewToData')
            && !viewToDataTranslateOptions['viewToData']) {
            // data to view translate
            if (!source || (typeof source === 'object' && !source.hasOwnProperty('point'))) {
                // ! source happens when the CartesianPosition or GeodeticPosition elements dont exist
                return {geodeticPosition_lat: null, geodeticPosition_long: null, geodeticPosition_height: null};
            } else {
                mapper.map('point.pos.value[0]').to('geodeticPosition_lat');
                mapper.map('point.pos.value[1]').to('geodeticPosition_long');
                mapper.map('point.pos.value[2]').to('geodeticPosition_height');
                return mapper.execute(source);
            }
        }
        // view  to data translate
        if (! source || (source.hasOwnProperty('geodeticPosition_lat') && source.geodeticPosition_lat === null)
        || !source.hasOwnProperty('geodeticPosition_lat')) {
            return {};
        } else {
            let value: string[] = [];

            value.push(source.geodeticPosition_lat);
            value.push(source.geodeticPosition_long);
            value.push(source.geodeticPosition_height);
            mapper.map('value').to('point.pos.value');
            return mapper.execute({'value': value});
        }
    }

    private static toDotNotation(jsonPointer: string): string {
        return jsonPointer
            .substring(1)
            .replace(/\//g, '.')
            .replace(/\.([0-9]+)/g, '[$1]');
    }

}
