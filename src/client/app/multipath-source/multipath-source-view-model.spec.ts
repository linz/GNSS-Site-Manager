import { MultipathSourceViewModel } from './multipath-source-view-model';

export function main() {
    let multipathSourceViewModel: MultipathSourceViewModel;

    describe('Multipath Source ViewModel View Model', () => {

        beforeEach(() => {
            multipathSourceViewModel = new MultipathSourceViewModel();
        });

        it('test default constructor and all fields are created', () => {
            expect(multipathSourceViewModel).toBeDefined();
            expect(multipathSourceViewModel.possibleProblemSource).toBeNull();
            expect(multipathSourceViewModel.notes).toBeNull();
            expect(multipathSourceViewModel.startDate).toBeNull();
            expect(multipathSourceViewModel.endDate).toBeNull();
        });
    });
}
