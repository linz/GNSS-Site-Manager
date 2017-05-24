import { TemperatureSensorViewModel } from './temperature-sensor-view-model';

export function main() {
  let temperatureSensorsViewModel: TemperatureSensorViewModel;

  describe('Temperature Sensors View Model', () => {

    beforeEach(() => {
      temperatureSensorsViewModel = new TemperatureSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(temperatureSensorsViewModel).toBeDefined();

      expect(temperatureSensorsViewModel.accuracyDegreesCelcius).toEqual(0);
      expect(temperatureSensorsViewModel.dataSamplingInterval).toEqual(0);
      expect(temperatureSensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(temperatureSensorsViewModel.manufacturer).toEqual('');
      expect(temperatureSensorsViewModel.notes).toEqual('');
      expect(temperatureSensorsViewModel.serialNumber).toEqual('');
      expect(temperatureSensorsViewModel.calibrationDate).toEqual('');
      expect(temperatureSensorsViewModel.startDate).toEqual('');
      expect(temperatureSensorsViewModel.endDate).toEqual('');
    });
  });
}
