import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';

export function main() {
  let waterVaporSensorsViewModel: WaterVaporSensorViewModel;

  describe('WaterVapor Sensors View Model', () => {

    beforeEach(() => {
      waterVaporSensorsViewModel = new WaterVaporSensorViewModel();
    });

    it('test default constructor and all fields are created', () => {
      expect(waterVaporSensorsViewModel).toBeDefined();
      expect(waterVaporSensorsViewModel.heightDiffToAntenna).toBeNull();
      expect(waterVaporSensorsViewModel.manufacturer).toBeNull();
      expect(waterVaporSensorsViewModel.notes).toBeNull();
      expect(waterVaporSensorsViewModel.serialNumber).toBeNull();
      expect(waterVaporSensorsViewModel.calibrationDate).toBeNull();
      expect(waterVaporSensorsViewModel.startDate).toBeNull();
      expect(waterVaporSensorsViewModel.endDate).toBeNull();
    });
  });
}
