import { AbstractGroupComponent } from './abstract-group.component';
import { AbstractViewModel } from '../json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../global/misc-utils';

class AbstractViewModelImpl extends AbstractViewModel {
    public startDate: string;

    constructor(startDate: string) {
        super();
        this.startDate = startDate;
    }

    createFieldMappings(): void {
        // comment
    }
}

class AbstractGroupImpl extends AbstractGroupComponent<AbstractViewModelImpl> {
    newItemViewModel(): AbstractViewModelImpl {
        return new AbstractViewModelImpl('new item');
    }

    getItemName(): string {
        return 'AbstractGroupImpl';
    }

    getControlName(): string {
        return 'abstractGroupImpl';
    }
}

export function main() {
    let abstractGroupImpl: AbstractGroupImpl;
    let avmi1: AbstractViewModelImpl;
    let avmi2: AbstractViewModelImpl;
    let avmi3: AbstractViewModelImpl;
    let avmi4: AbstractViewModelImpl;

    describe('AbstractGroup test', () => {

        beforeEach(() => {
            abstractGroupImpl = new AbstractGroupImpl(null, null);
            avmi1 = new AbstractViewModelImpl('4');
            avmi1.dateDeleted = MiscUtils.getUTCDateTime();
            avmi2 = new AbstractViewModelImpl('3');
            avmi4 = new AbstractViewModelImpl('2');
            avmi3 = new AbstractViewModelImpl('1');
            let list: AbstractViewModelImpl[] = [];
            list.push(avmi1, avmi2, avmi3, avmi4);
            abstractGroupImpl.setItemsCollection(list); // This will perform an ascending sort
        });

        it('test getItemsCollection()', () => {
            expect(abstractGroupImpl).toBeDefined();

            // 4,3,2,1 -> avmi1,2,4,3
            let showDeleted: AbstractViewModel[] = abstractGroupImpl.getItemsCollection();
            expect(showDeleted).toBeDefined();
            expect(showDeleted.length).toEqual(4);
            expect(showDeleted).toContain(avmi1);
            expect(showDeleted[0]).toEqual(avmi1);
            expect(showDeleted[1]).toEqual(avmi2);
            expect(showDeleted[2]).toEqual(avmi4);
            expect(showDeleted[3]).toEqual(avmi3);
        });
    });

    describe('AbstractGroup test - test value changed it is reflected in original data', () => {
        let isSet: boolean = false;
        let countNotSet: number = 0;

        beforeEach(() => {
            abstractGroupImpl = new AbstractGroupImpl(null, null);
            avmi1 = new AbstractViewModelImpl('4');
            avmi2 = new AbstractViewModelImpl('3');
            avmi4 = new AbstractViewModelImpl('2');
            avmi3 = new AbstractViewModelImpl('1');
            let list: AbstractViewModelImpl[] = [];
            list.push(avmi1, avmi2, avmi3, avmi4);
            abstractGroupImpl.setItemsCollection(list);

            isSet = false;
            countNotSet = 0;
        });

        it('test when item has value changed it is reflected in original data', () => {
            let items: AbstractViewModel[] = abstractGroupImpl.getItemsCollection();
            let first: AbstractViewModelImpl = <AbstractViewModelImpl> items[0];
            expect(first.startDate).toEqual('4');
            first.startDate = '99';
            expect(first.startDate).toEqual('99');

            let theDefault: AbstractViewModel[] = abstractGroupImpl.getItemsCollection();

            for (let item of theDefault) {
                let itemImpl = <AbstractViewModelImpl>item;
                if (itemImpl.startDate && itemImpl.startDate === '99') {
                    isSet = true;
                } else {
                    countNotSet++;
                }
            }
            expect(isSet).toEqual(true);
            expect(countNotSet).toBeGreaterThan(1);
        });
    });
}
