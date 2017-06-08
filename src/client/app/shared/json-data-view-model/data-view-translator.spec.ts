import { SiteLogDataModel } from './data-model/site-log-data-model';
import { DataViewTranslatorService, ObjectMap } from './data-view-translator';
import { JsonViewModelServiceSpecData } from './json-view-model.service.spec.data';
import { HumiditySensorViewModel } from '../../humidity-sensor/humidity-sensor-view-model';
import { DataViewTranslatorSpecData } from './data-view-translator.spec.data';

export function main() {
  let completeValidSitelog: any = JsonViewModelServiceSpecData.data();
  let objectMap: ObjectMap = new HumiditySensorViewModel().getObjectMap();

  describe('Json view translator service', () => {

    it('should be defined', () => {
      expect(completeValidSitelog).toBeDefined();
      expect(objectMap).toBeDefined();
    });

    it('should translate d2v for humiditySensors', () => {
      let humiditySensorsData: any[] = new SiteLogDataModel(completeValidSitelog).humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0];

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap());

      expect(firstHSV).toBeDefined();

      expect(firstHSV.accuracyPercentRelativeHumidity).not.toBeNull();
      expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.humiditySensor.accuracyPercentRelativeHumidity);
      expect(firstHSV.aspiration).toBeNull();
      expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.humiditySensor.dataSamplingInterval);
      expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.humiditySensor.heightDiffToAntenna);
      expect(firstHSV.manufacturer).toEqual(firstHSD.humiditySensor.manufacturer);
      expect(firstHSV.notes).toBeNull();
      expect(firstHSV.serialNumber).toBeNull();

      expect(firstHSV.calibrationDate).toEqual(firstHSD.humiditySensor.calibrationDate.value[0]);
      expect(firstHSV.startDate).toEqual(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
      expect(firstHSV.endDate).toBeNull();
    });

    it('should translate v2d for humiditySensors', () => {
      let humiditySensorsData: any = new SiteLogDataModel(completeValidSitelog).humiditySensors;
      expect(humiditySensorsData).toBeDefined();
      let firstHSD: any = humiditySensorsData[0];

      let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

      DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap());

      let newHSD: any = {};
      DataViewTranslatorService.translate(firstHSV, newHSD, firstHSV.getObjectMap().inverse());

      expect(newHSD).toBeDefined();

      expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
      expect(newHSD.humiditySensor.aspiration).toBeNull();
      expect(newHSD.humiditySensor.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
      expect(newHSD.humiditySensor.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
      expect(newHSD.humiditySensor.manufacturer).toEqual(firstHSV.manufacturer);
      expect(newHSD.humiditySensor.notes).toEqual(firstHSV.notes);
      expect(newHSD.humiditySensor.serialNumber).toEqual(firstHSV.serialNumber);

      expect(newHSD.humiditySensor.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
      expect(firstHSV.startDate).toEqual(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0]);
      expect(firstHSV.endDate).toBeNull();
      expect(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
    });

      it('should translate d2v for humiditySensors using translate method', () => {
          let humiditySensorsData: any[] = new SiteLogDataModel(completeValidSitelog).humiditySensors;
          expect(humiditySensorsData).toBeDefined();
          let firstHSD: any = humiditySensorsData[0];

          let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

          DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap()); // comment

          expect(firstHSV).toBeDefined();

          expect(firstHSV.accuracyPercentRelativeHumidity).toEqual(firstHSD.humiditySensor.accuracyPercentRelativeHumidity);
          expect(firstHSV.aspiration).toBeNull();
          expect(firstHSV.dataSamplingInterval).toEqual(firstHSD.humiditySensor.dataSamplingInterval);
          expect(firstHSV.heightDiffToAntenna).toEqual(firstHSD.humiditySensor.heightDiffToAntenna);
          expect(firstHSV.manufacturer).toEqual(firstHSD.humiditySensor.manufacturer);
          expect(firstHSV.notes).toBeNull();
          expect(firstHSV.serialNumber).toBeNull();

          expect(firstHSV.calibrationDate).toEqual(firstHSD.humiditySensor.calibrationDate.value[0]);
          expect(firstHSV.startDate).toEqual(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod']
              .beginPosition.value[0]);
          expect(firstHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeUndefined();
          expect(firstHSV.endDate).toBeNull();
      });

      it('should translate v2d for humiditySensors using translate method', () => {
          let humiditySensorsData: any = new SiteLogDataModel(completeValidSitelog).humiditySensors;
          expect(humiditySensorsData).toBeDefined();
          let firstHSD: any = humiditySensorsData[0];

          let firstHSV: HumiditySensorViewModel = new HumiditySensorViewModel();

          DataViewTranslatorService.translate(firstHSD, firstHSV, firstHSV.getObjectMap());

          let newHSD: any = {};
          DataViewTranslatorService.translate(firstHSV, newHSD, firstHSV.getObjectMap().inverse());

          expect(newHSD).toBeDefined();

          expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).not.toBeNull();
          expect(newHSD.humiditySensor.accuracyPercentRelativeHumidity).toEqual(firstHSV.accuracyPercentRelativeHumidity);
          expect(newHSD.humiditySensor.aspiration).toEqual(firstHSV.aspiration);
          expect(newHSD.humiditySensor.dataSamplingInterval).toEqual(firstHSV.dataSamplingInterval);
          expect(newHSD.humiditySensor.heightDiffToAntenna).toEqual(firstHSV.heightDiffToAntenna);
          expect(newHSD.humiditySensor.manufacturer).toEqual(firstHSV.manufacturer);
          expect(newHSD.humiditySensor.notes).toEqual(firstHSV.notes);
          expect(newHSD.humiditySensor.serialNumber).toEqual(firstHSV.serialNumber);

          expect(newHSD.humiditySensor.calibrationDate.value[0]).toEqual(firstHSV.calibrationDate);
          expect(firstHSV.startDate).toEqual(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod']
              .beginPosition.value[0]);
          expect(firstHSV.endDate).toBeNull();
          expect(newHSD.humiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]).toBeNull();
      });

      describe('Point type translate', () => {
          // CartesianPosition
          it('should translate SiteLocations CartesianPosition View to Data - has 3 point values (normal case)', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let cartesianPositionView: any = view.siteLocation.cartesianPosition;

              let cartesianPosData: any = DataViewTranslatorService.translateCartesianPosition(cartesianPositionView, {viewToData: true});

              expect(cartesianPosData.point.pos.value[0]).toBe(cartesianPositionView.cartesianPositionX);
              expect(cartesianPosData.point.pos.value[1]).toBe(cartesianPositionView.cartesianPositionY);
              expect(cartesianPosData.point.pos.value[2]).toBe(cartesianPositionView.cartesianPositionZ);
          });

          it('should translate SiteLocations CartesianPosition View to Data - has null point values', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let cartesianPositionView: any = view.siteLocation.cartesianPosition;
              cartesianPositionView.cartesianPositionX = null; // The UI forces either all to be required or none to be.  So just one is ok

              let cartesianPosData: any = DataViewTranslatorService.translateCartesianPosition(cartesianPositionView, {viewToData: true});

              expect(typeof cartesianPosData).toBe('object');
              expect(Object.keys(cartesianPosData).length).toBe(0);
          });

          it('should translate SiteLocations CartesianPosition Data to View - has 3 point values (normal case)', () => {
              let data: any = DataViewTranslatorSpecData.dataObject();
              let cartesianPosData: any = data.siteLocation.approximatePositionITRF.cartesianPosition;

              let cartesianPositionView: any = DataViewTranslatorService.translateCartesianPosition(cartesianPosData, {viewToData: false});

              expect(cartesianPositionView.cartesianPositionX).toBe(cartesianPosData.point.pos.value[0]);
              expect(cartesianPositionView.cartesianPositionY).toBe(cartesianPosData.point.pos.value[1]);
              expect(cartesianPositionView.cartesianPositionZ).toBe(cartesianPosData.point.pos.value[2]);
          });

          it('should translate SiteLocations CartesianPosition Data to View - has null point values', () => {
              let cartesianPosData = {TYPE_NAME: 'GEODESYML_0_4.CartesianPosition'};

              let cartesianPositionView: any = DataViewTranslatorService.translateCartesianPosition(cartesianPosData, {viewToData: false});

              expect(typeof cartesianPositionView).toBe('object');
              expect(cartesianPositionView.cartesianPositionX).toBeNull();
              expect(cartesianPositionView.cartesianPositionY).toBeNull();
              expect(cartesianPositionView.cartesianPositionZ).toBeNull();
          });
          // GeodeticPosition
          it('should translate SiteLocations GeodeticPosition View to Data - has 3 point values (normal case)', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let geodeticPositionView: any = view.siteLocation.geodeticPosition;

              let geodeticPosData: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPositionView, {viewToData: true});

              expect(geodeticPosData.point.pos.value[0]).toBe(geodeticPositionView.geodeticPositionLat);
              expect(geodeticPosData.point.pos.value[1]).toBe(geodeticPositionView.geodeticPositionLong);
              expect(geodeticPosData.point.pos.value[2]).toBe(geodeticPositionView.geodeticPositionHeight);
          });

          it('should translate SiteLocations GeodeticPosition View to Data - has null point values', () => {
              let view: any = DataViewTranslatorSpecData.viewObject();
              let geodeticPositionView: any = view.siteLocation.geodeticPosition;
              geodeticPositionView.geodeticPositionLat = null; // The UI forces either all to be required or none to be.  So just one is ok

              let geodeticPosData: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPositionView, {viewToData: true});

              expect(typeof geodeticPosData).toBe('object');
              expect(Object.keys(geodeticPosData).length).toBe(0);
          });

          it('should translate SiteLocations GeodeticPosition Data to View - has 3 point values (normal case)', () => {
              let data: any = DataViewTranslatorSpecData.dataObject();
              let geodeticPosData: any = data.siteLocation.approximatePositionITRF.geodeticPosition;

              let geodeticPositionView: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPosData, {viewToData: false});

              expect(geodeticPositionView.geodeticPositionLat).toBe(geodeticPosData.point.pos.value[0]);
              expect(geodeticPositionView.geodeticPositionLong).toBe(geodeticPosData.point.pos.value[1]);
              expect(geodeticPositionView.geodeticPositionHeight).toBe(geodeticPosData.point.pos.value[2]);
          });

          it('should translate SiteLocations GeodeticPosition Data to View - has null point values', () => {
              let geodeticPosData = {TYPE_NAME: 'GEODESYML_0_4.GeodeticPosition'};
              let geodeticPositionView: any = DataViewTranslatorService.translateGeodeticPosition(geodeticPosData, {viewToData: false});

              expect(typeof geodeticPositionView).toBe('object');
              expect(geodeticPositionView.geodeticPositionLat).toBeNull();
              expect(geodeticPositionView.geodeticPositionLong).toBeNull();
              expect(geodeticPositionView.geodeticPositionHeight).toBeNull();
          });

          // Both GeodeticPosition and CartesianPosition
          it('should translate SiteLocations GeodeticPosition and CartesianPosition as defaults (null) due to null parents', () => {
              // If GeodeticPosition and CartesianPosition are saved as null then JSonix sets the parent
              // approximatePositionITRF element to empty
              // The mapper will pull out no values to try and translate
              let geodeticPositionView: any = DataViewTranslatorService.translateGeodeticPosition(undefined, {viewToData: false});

              expect(typeof geodeticPositionView).toBe('object');
              expect(geodeticPositionView.geodeticPositionLat).toBeNull();
              expect(geodeticPositionView.geodeticPositionLong).toBeNull();
              expect(geodeticPositionView.geodeticPositionHeight).toBeNull();

              let cartesianPositionView: any = DataViewTranslatorService.translateCartesianPosition(undefined, {viewToData: false});

              expect(typeof cartesianPositionView).toBe('object');
              expect(cartesianPositionView.cartesianPositionX).toBeNull();
              expect(cartesianPositionView.cartesianPositionY).toBeNull();
              expect(cartesianPositionView.cartesianPositionZ).toBeNull();
          });
      });
  });
}
