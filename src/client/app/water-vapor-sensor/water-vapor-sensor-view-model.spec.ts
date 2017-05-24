import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';

export function main() {
  let waterVaporSensorsViewModel: WaterVaporSensorViewModel;

  describe('WaterVapor Sensors View Model', () => {

    beforeEach(() => {
      waterVaporSensorsViewModel = new WaterVaporSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(waterVaporSensorsViewModel).toBeDefined();
      expect(waterVaporSensorsViewModel.heightDiffToAntenna).toEqual(0);
      expect(waterVaporSensorsViewModel.manufacturer).toEqual('');
      expect(waterVaporSensorsViewModel.notes).toEqual('');
      expect(waterVaporSensorsViewModel.serialNumber).toEqual('');
      expect(waterVaporSensorsViewModel.calibrationDate).toEqual('');
      expect(waterVaporSensorsViewModel.startDate).toEqual('');
      expect(waterVaporSensorsViewModel.endDate).toEqual('');
    });
  });
}
