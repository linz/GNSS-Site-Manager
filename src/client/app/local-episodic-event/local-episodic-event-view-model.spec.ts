import { LocalEpisodicEventViewModel } from './local-episodic-event-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
export function main() {
  let localEpisodicEventViewModel: LocalEpisodicEventViewModel;

  describe('Local Episodic Effects View Model', () => {

    beforeEach(() => {
      localEpisodicEventViewModel = new LocalEpisodicEventViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(localEpisodicEventViewModel).toBeDefined();

      expect(localEpisodicEventViewModel.event).toEqual('');

      let nowPart: string = MiscUtils.getPresentDateTime().replace(/T.*/,'');
      expect(localEpisodicEventViewModel.startDate).toBeDefined();
      expect(localEpisodicEventViewModel.startDate).toContain(nowPart);
      expect(localEpisodicEventViewModel.endDate).toEqual('');
    });
  });
}
