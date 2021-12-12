# This repo is OBSOLETE / UNSAFE

As of 13/12/2021 the Site Manager is no longer deployed in either non-production or production environments - this repository is maintained for reference purposes only.

The repository also appears to contain log4j configuration which may be at risk from the [December 2021 Java log4j vulnerability](https://www.cert.govt.nz/it-specialists/advisories/log4j-rce-0-day-actively-exploited/). 
See story: [Investigate and address any impact on geodetic systems resulting from the Dec 2021 Java log4j vulnerability#467](https://app.zenhub.com/workspaces/geodetic-redevelopment-5cae57e8e94905314d587ebe/issues/linz/geodetic-system-redevelopment/467). 
**IT SHOULD NOT BE DEPLOYED WITHOUT ADDRESSING THIS RISK**.


[![Build Status](https://travis-ci.org/GeoscienceAustralia/GNSS-Site-Manager.svg?branch=master)](https://travis-ci.org/GeoscienceAustralia/GNSS-Site-Manager)

# GNSS Site Manager 

## About

GNSS Site Manager is an Angular web application written in TypeScript for
managing GNSS CORS site metadata. It is based on
[mgechev/angular-seed](https://github.com/mgechev/angular-seed).

## Deployment

| Environment | Branch | Trigger | URL |
| ----------- | ------ | :-----: | --- |
| integration | `next`   | on commit | https://dev.gnss-site-manager.geodesy.ga.gov.au |
| testing     | `master` | on commit | https://test.gnss-site-manager.geodesy.ga.gov.au |
| production  | `master` | manual    | https://gnss-site-manager.geodesy.ga.gov.au |

## Access

If you require a login account, which is required for write access, please complete 
the online registration form in
[integration](https://dev.gnss-site-manager.geodesy.ga.gov.au/userRegistration),
[testing](https://test.gnss-site-manager.geodesy.ga.gov.au/userRegistration), or
[production](https://gnss-site-manager.geodesy.ga.gov.au/userRegistration) environments.

