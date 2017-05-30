import { LocalEpisodicEffectViewModel } from './local-episodic-effect-view-model';

export function main() {
  let localEpisodicEffectViewModel: LocalEpisodicEffectViewModel;

  describe('Local Episodic Effects View Model', () => {

    beforeEach(() => {
      localEpisodicEffectViewModel = new LocalEpisodicEffectViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(localEpisodicEffectViewModel).toBeDefined();
      expect(localEpisodicEffectViewModel.event).toBeNull();
      expect(localEpisodicEffectViewModel.startDate).toBeNull();
      expect(localEpisodicEffectViewModel.endDate).toBeNull();
    });
  });
}
