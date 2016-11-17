import { Injectable } from '@angular/core';
import { MiscUtilsService } from './misc-utils.service';

@Injectable()
export class JsonCheckService {
  private metadataCustodian: any = {
     ciResponsibleParty: {
      contactInfo: {
        ciContact: {
          address: {
            ciAddress: {
              id: ''
            }
          }
        }
      }
    }

  };

  private siteContact: any = {
    positionName: {
      value: ''
    },
    contactInfo: {
      ciContact: {
        address: {
          ciAddress: {
            deliveryPoint: [{
              characterString: {'gco:CharacterString': ''}
            }],
            electronicMailAddress: [{
              characterString: {'gco:CharacterString': ''}
            }]
          },
          phone: {
            ciTelephone: {
              voice: [{
                characterString: {'gco:CharacterString': ''}
              }]
            }
          }
        }
      }
    }
  };

  private receiver: any = {
    receiverType: {
      value: ''
    },
    manufacturerSerialNumber: '',
    serialNumber: '',
    firmwareVersion: '',
    satelliteSystem: [
      {
        codeListValue: '',
        value: ''
      }
    ],
    elevationCutoffSetting: '',
    temperatureStabilization: '',
    dateInstalled: {
      value: ['']
    },
    dateRemoved: {
      value: ['']
    },
    notes: ''
  };

  private antenna: any = {
    antennaType: {
      codeListValue: '',
      value: ''
    },
    serialNumber: '',
    antennaReferencePoint: {
      value: ''
    },
    markerArpUpEcc: '',
    markerArpNorthEcc: '',
    markerArpEastEcc: '',
    alignmentFromTrueNorth: '',
    antennaRadomeType: {
      value: ''
    },
    radomeSerialNumber: '',
    antennaCableType: '',
    antennaCableLength: '',
    dateInstalled: {
      value: ['']
    },
    dateRemoved: {
      value: ['']
    },
    notes: ''
  };

  private frequencyStandard: any = {
    standardType: {
      value: ''
    },
    inputFrequency: '',
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: {
            value: ['']
          },
          endPosition: {
            value: ['']
          }
        }
      }
    },
    notes: ''
  };

  private humiditySensor: any = {
    dataSamplingInterval: 0,
    accuracyPercentRelativeHumidity: 0,
    aspiration: '',
    notes: '',
    manufacturer: '',
    serialNumber: '',
    heightDiffToAntenna: 0,
    calibrationDate: {
      value: ['']
    },
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: {
            value: ['']
          },
          endPosition: {
            value: ['']
          }
        }
      }
    }
  };

  private episodicEffect: any = {
    event: '',
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: {
            value: ['']
          },
          endPosition: {
            value: ['']
          }
        }
      }
    }
  };

  constructor(private utilsService: MiscUtilsService) {}

  public checkMetadataCustodian(json: any): void {
    this.merge(json, this.metadataCustodian);
  }

  public getNewMetadataCustodian(): any {
    return this.metadataCustodian;
  }

  public checkSiteContact(json: any): void {
    this.merge(json, this.siteContact);
  }

  public getNewSiteContact(): any {
    return this.siteContact;
  }

  public checkReceiver(json: any): void {
    this.merge(json, this.receiver);
  }

  public getNewReceiver(): any {
    return this.receiver;
  }

  public checkAntenna(json: any): void {
    this.merge(json, this.antenna);
  }

  public getNewAntenna(): any {
    return this.antenna;
  }

  public checkFrequencyStandard(json: any): void {
    this.merge(json, this.frequencyStandard);
  }

  public getNewFrequencyStandard(): any {
    return this.frequencyStandard;
  }

  public checkHumiditySensor(json: any): void {
    this.merge(json, this.humiditySensor);
  }

  public getNewHumiditySensor(): any {
    return this.humiditySensor;
  }

  public checkEpisodicEffect(json: any): void {
    this.merge(json, this.episodicEffect);
  }

  public getNewEpisodicEffect(): any {
    return this.episodicEffect;
  }

  /**
   * Merge two JSON objects by copying any missing paths from json2 to json1
   *
   * @param json1: a JSON object with valid values, but some of its mandatory paths/fields may be missing
   * @param json2: a JSON object contains all mandatory paths/fields for UI,  but with null/empty values
   */
  public merge(json1: any, json2: any): void {
    let objType1: any = this.utilsService.getObjectType(json1);
    let objType2: any = this.utilsService.getObjectType(json2);
    if (objType2 === 'Object') {
      for (let attrName in json2) {
        if (json1.hasOwnProperty(attrName)) {
          this.merge(json1[attrName], json2[attrName]);
        } else {
          json1[attrName] = this.utilsService.cloneJsonObj(json2[attrName]);
        }
      }
    } else if (objType2 === 'Array' && json2.length > 0) {
      if (objType1 !== 'Array') {
        json1 = [];
      }

      if (json1.length === 0) {
        json1.push(this.utilsService.cloneJsonObj(json2[0]));
      } else {
        for (let i in json2) {
          if (json1.length <= i) {
            json1.push(this.utilsService.cloneJsonObj(json2[i]));
          } else {
            this.merge(json1[i], json2[i]);
          }
        }
      }
    }
  }
}
