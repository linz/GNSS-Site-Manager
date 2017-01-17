import {ViewSiteLog} from './site-log-view-model';
import {HumiditySensorViewModel} from '../../../humidity-sensor/humidity-sensor-view-model';
export function main() {
    describe('SiteLog View Model', () => {
        let viewModel: ViewSiteLog;
        beforeEach(() => {
            viewModel = new ViewSiteLog();

            let hs1 = new HumiditySensorViewModel();
            hs1.startDate = '1';

            let hs2 = new HumiditySensorViewModel();
            hs2.startDate = '2';
            let hs3 = new HumiditySensorViewModel();
            hs3.startDate = '3';
            let hs4 = new HumiditySensorViewModel();
            hs4.startDate = '4';
            let hs5 = new HumiditySensorViewModel();
            hs5.startDate = '5';

            viewModel.humiditySensors = [];
            viewModel.humiditySensors.push(hs1, hs2, hs3, hs4, hs5);

        });

        it('test save after some items are deleted', () => {
            expect(viewModel).toBeDefined();
            expect(viewModel.humiditySensors.length).toEqual(5);

            viewModel.humiditySensors[1].setDateDeleted();
            viewModel.humiditySensors[3].setDateDeleted();

            viewModel.beforeSave();
            expect(viewModel.humiditySensors.length).toEqual(3);
        });
    });
}
