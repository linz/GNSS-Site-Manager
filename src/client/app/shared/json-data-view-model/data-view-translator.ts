import { AbstractViewModel } from './view-model/abstract-view-model';
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
        let mapper = createMapper({ alwaysSet: true });

        for (let fieldMap of objectMap.getFieldMaps()) {
            let sourcePath = DataViewTranslatorService.toDotNotation(fieldMap.sourceField.pointer);
            let targetPath = DataViewTranslatorService.toDotNotation(fieldMap.targetField.pointer);

            mapper.map(sourcePath).to(targetPath, (source: any) => {
                if (source instanceof Date) {
                    return MiscUtils.formatDateToDatetimeString(source as Date);
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
