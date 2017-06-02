import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SiteLogComponent } from './site-log.component';
import { SiteIdentificationComponent } from './site-identification.component';
import { SiteLocationComponent } from './site-location.component';
import { SiteLogRoutingModule } from './site-log-routing.module';
import { ConfirmDeactivateSiteLogGuard } from './site-log-deactivate.module';
import { ResponsiblePartyModule } from '../responsible-party/responsible-party.module';
import { GnssReceiverModule } from '../gnss-receiver/gnss-receiver.module';
import { GnssAntennaModule } from '../gnss-antenna/gnss-antenna.module';
import { SurveyedLocalTieModule } from '../surveyed-local-tie/surveyed-local-tie.module';
import { FrequencyStandardModule } from '../frequency-standard/frequency-standard.module';
import { LocalEpisodicEffectModule } from '../local-episodic-effect/local-episodic-effect.module';
import { HumiditySensorModule } from '../humidity-sensor/humidity-sensor.module';
import { PressureSensorModule } from '../pressure-sensor/pressure-sensor.module';
import { TemperatureSensorModule } from '../temperature-sensor/temperature-sensor.module';
import { WaterVaporSensorModule } from '../water-vapor-sensor/water-vapor-sensor.module';
import { DynamicFormFieldsModule } from '../shared/dynamic-form-fields/dynamic-form-fields.module';
import { RadioInterferenceModule } from '../radio-interference/radio-interference.module';
import { SignalObstructionModule } from '../signal-obstruction/signal-obstruction.module';
import { MultipathSourceModule } from '../multipath-source/multipath-source.module';

@NgModule({
  imports: [
    SiteLogRoutingModule,
    CommonModule,
    SharedModule,
    ResponsiblePartyModule,
    GnssReceiverModule,
    GnssAntennaModule,
    SurveyedLocalTieModule,
    FrequencyStandardModule,
    LocalEpisodicEffectModule,
    HumiditySensorModule,
    PressureSensorModule,
    TemperatureSensorModule,
    WaterVaporSensorModule,
    DynamicFormFieldsModule,
      RadioInterferenceModule,
      SignalObstructionModule,
      MultipathSourceModule
  ],
  declarations: [SiteLogComponent, SiteIdentificationComponent, SiteLocationComponent],
  exports: [SiteLogComponent, SiteIdentificationComponent, SiteLocationComponent],
  providers: [
    ConfirmDeactivateSiteLogGuard,
  ],
})

export class SiteLogModule { }
