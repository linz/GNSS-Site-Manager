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
    constructor(
        public readonly sourceField: TypedPointer,
        public readonly targetField: TypedPointer,
        public readonly objectMap: ObjectMap = null,
    ) {}

    public inverse(): FieldMap {
        return new FieldMap(this.targetField, this.sourceField, this.objectMap ? this.objectMap.inverse() : null);
    }
}

type MapFn = (a: any) => any;

export class ObjectMap {

    private fieldMaps = new Array<FieldMap>();

    private sourcePreMap: MapFn = _.identity;
    private targetPreMap: MapFn = _.identity;

    private sourcePostMap: MapFn = _.identity;
    private targetPostMap: MapFn = _.identity;

    public inverse(): ObjectMap {
        let inverse = new ObjectMap();
        _.forEach(this.fieldMaps, f => {
            inverse.add(f.inverse());
        });
        inverse.sourcePreMap = this.targetPreMap;
        inverse.targetPreMap = this.sourcePreMap;
        inverse.sourcePostMap = this.targetPostMap;
        inverse.targetPostMap = this.sourcePostMap;
        return inverse;
    }

    public addSourcePreMap(fn: MapFn): ObjectMap {
        this.sourcePreMap = _.flow(this.sourcePreMap, fn);
        return this;
    }

    public addTargetPreMap(fn: MapFn): ObjectMap {
        this.targetPreMap = _.flow(this.targetPreMap, fn);
        return this;
    }

    public addSourcePostMap(fn: MapFn): ObjectMap {
        this.sourcePostMap = _.flow(this.sourcePostMap, fn);
        return this;
    }

    public addTargetPostMap(fn: MapFn): ObjectMap {
        this.targetPostMap = _.flow(this.targetPostMap, fn);
        return this;
    }

    public add(fieldMap: FieldMap) {
        this.fieldMaps.push(fieldMap);
    }

    public addFieldMap(source: string, target: string, objectMap: ObjectMap = null): ObjectMap {
        this.add(new FieldMap(new TypedPointer(source, null), new TypedPointer(target, null), objectMap));
        return this;
    }

    // TODO: remove this getter once object translate is implemented in ObjectMap
    public getFieldMaps(): FieldMap[] {
        return this.fieldMaps;
    }

    public map(source: any): any {
        source = this.sourcePreMap(source);
        let mapped: any;
        if (!source) {
            mapped = null;
        } else if (this.fieldMaps.length === 0) {
            mapped = source;
        } else {
            mapped = this.getObjectMapper().execute(source);
        }
        return this.targetPostMap(mapped);
    }

    private getObjectMapper(): any {
        let mapper = createMapper({ alwaysTransform: true, alwaysSet: true });
        for (let fieldMap of this.fieldMaps) {
            let sourcePath = fieldMap.sourceField.pointer;
            let targetPath = fieldMap.targetField.pointer + '?';

            if (fieldMap.objectMap) {
                mapper.map(sourcePath).to(targetPath, (source: any): any => {
                    if (Array.isArray(source)) {
                        return _.map(source, (element: any) => fieldMap.objectMap.map(element));
                    } else {
                        return fieldMap.objectMap.map(source);
                    }
                });
            } else {
                mapper.map(sourcePath).to(targetPath, (source: any): any => {
                    return source === undefined ? null : source;
                });
            }
        }
        return mapper;
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

                if (fieldMap.objectMap) {
                    return fieldMap.objectMap.map(source);
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

    private static toDotNotation(jsonPointer: string): string {
        return jsonPointer
            .substring(1)
            .replace(/\//g, '.')
            .replace(/\.([0-9]+)/g, '[$1]');
    }
}
