import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { TestUtils } from '../utils/test.utils';

const timestamp: string = TestUtils.getTimeStamp();

export const mockResponsibleParty: ResponsiblePartyViewModel = {
    individualName: 'Homer Simpson',
    organisationName: 'Geoscience Australia',
    positionName: 'Manager ' + timestamp,
    deliveryPoint: 'Cnr Jerrabomberra Ave and Hindmarsh Drive',
    city: 'Symonston',
    administrativeArea: 'ACT',
    postalCode: '2609',
    country: 'Australia',
    email: 'Homer.Simpson@ga.gov.au',
    primaryPhone: '0262499997',
    secondaryPhone: '0262499998',
    fax: '0262499999',
    url: 'http://www.ga.gov.au',

    id: null,
    startDate: null,
    endDate: null,
    dateInserted: null,
    dateDeleted: null,
    deletedReason: null,
    isDeleted: false
};
