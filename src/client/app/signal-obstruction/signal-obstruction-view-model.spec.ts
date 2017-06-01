import { SignalObstructionViewModel } from './signal-obstruction-view-model';

export function main() {
  let signalObstructionViewModel: SignalObstructionViewModel;

  describe('Radio Interference View Model', () => {

    beforeEach(() => {
      signalObstructionViewModel = new SignalObstructionViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(signalObstructionViewModel).toBeDefined();
      expect(signalObstructionViewModel.possibleProblemSource).toBeNull();
      expect(signalObstructionViewModel.notes).toBeNull();
      expect(signalObstructionViewModel.startDate).toBeNull();
      expect(signalObstructionViewModel.endDate).toBeNull();
    });
  });
}
