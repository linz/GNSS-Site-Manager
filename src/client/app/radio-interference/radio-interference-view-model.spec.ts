import { RadioInterferenceViewModel } from './radio-interference-view-model';

export function main() {
  let radioInterferenceViewModel: RadioInterferenceViewModel;

  describe('Radio Interference View Model', () => {

    beforeEach(() => {
      radioInterferenceViewModel = new RadioInterferenceViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(radioInterferenceViewModel).toBeDefined();
      expect(radioInterferenceViewModel.possibleProblemSource).toBeNull();
      expect(radioInterferenceViewModel.observedDegradation).toBeNull();
      expect(radioInterferenceViewModel.notes).toBeNull();
      expect(radioInterferenceViewModel.startDate).toBeNull();
      expect(radioInterferenceViewModel.endDate).toBeNull();
    });
  });
}
