import {Component, Input} from '@angular/core';
import { MiscUtilsService, JsonCheckService } from '../shared/index';

/**
 * This class represents a Surveyed Local Ties object
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-surveyed-local-tie',
  templateUrl: 'surveyed-local-ties.component.html',
})
export class SurveyedLocalTiesComponent {
  public errorMessage: string;
  @Input() status: any;
  @Input() surveyedLocalTies: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

  constructor(private miscUtilsService: MiscUtilsService,
              private jsonCheckService: JsonCheckService) { }

  /**
   * Returns true if all previous Surveyed Local Ties are open, otherwise returns false
   */
  public arePreviousSurveyedLocalTiesOpen() {
    if(this.status.isSurveyedLocalTiesOpen === null) {
      throw new Error('status.isSurveyedLocalTiesOpen is null');
    }
    for (let i = 1; i < this.status.isSurveyedLocalTiesOpen.length; i ++) {
      if (!this.status.isSurveyedLocalTiesOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous Surveyed Local Ties are closed, otherwise returns false
   */
  public arePreviousSurveyedLocalTiesClosed() {
    if(this.status.isSurveyedLocalTiesOpen === null) {
      throw new Error('status.isSurveyedLocalTiesOpen is null');
    }
    for (let i = 1; i < this.status.isSurveyedLocalTiesOpen.length; i ++) {
      if (this.status.isSurveyedLocalTiesOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous Surveyed Local Ties
   */
  public togglePreviousSurveyedLocalTies(flag: boolean) {
    if(this.status.isSurveyedLocalTiesOpen === null) {
      throw new Error('status.isSurveyedLocalTiesOpen is null');
    }
    for (let i = 1; i < this.status.isSurveyedLocalTiesOpen.length; i ++) {
      this.status.isSurveyedLocalTiesOpen[i] = flag;
    }
  }

  /**
   * Add a new empty Surveyed Local Tie as current one and push the 'old' current Surveyed Local Tie into previous list
   */
  public addNewSurveyedLocalTie() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.surveyedLocalTies) {
      this.surveyedLocalTies = [];
    }

    let newSurveyedLocalTie = this.jsonCheckService.getNewSurveyedLocalTie();

    // Clone from one of surveyed local tie objects so that the "new" surveyed local tie object can be saved
    let clonedObject: any = {};
    if ( this.siteLogModel.surveyedLocalTies && this.siteLogModel.surveyedLocalTies.length > 0 ) {
    	clonedObject = this.miscUtilsService.cloneJsonObj(this.siteLogModel.surveyedLocalTies[0]);
    }

    // Keep a copy of the surveyed local tie object as the original one for comparison
    let originalObject: any = this.miscUtilsService.cloneJsonObj(clonedObject);
    originalObject.surveyedLocalTie = this.miscUtilsService.cloneJsonObj(newSurveyedLocalTie);
    if (!this.siteLogOrigin.surveyedLocalTies) {
      this.siteLogOrigin.surveyedLocalTies = [];
    }
    this.siteLogOrigin.surveyedLocalTies.unshift(originalObject);

    newSurveyedLocalTie.dateMeasured.value[0] = presentDT;
    clonedObject.surveyedLocalTie = newSurveyedLocalTie;
    if (!this.siteLogModel.surveyedLocalTies) {
      this.siteLogModel.surveyedLocalTies = [];
    }
    this.siteLogModel.surveyedLocalTies.unshift(clonedObject);

    // Add the new surveyed local tie as current one and open it by default
    this.surveyedLocalTies.unshift(newSurveyedLocalTie);
    this.status.isSurveyedLocalTiesOpen.unshift(true);
    this.status.isSurveyedLocalTiesGroupOpen = true;
    this.status.hasNewSurveyedLocalTie = true;
  }

  /**
   * Remove the new current surveyed local tie from the surveyed local tie list and restore the old current surveyed local tie
   */
  public removeNewSurveyedLocalTies() {
    this.siteLogModel.surveyedLocalTies.shift();
    this.siteLogOrigin.surveyedLocalTies.shift();
    this.surveyedLocalTies.shift();
    this.status.isSurveyedLocalTiesOpen.shift();
    this.status.hasNewSurveyedLocalTie = false;
    if (this.surveyedLocalTies !== null && this.surveyedLocalTies.length > 0) {
      this.status.isSurveyedLocalTiesOpen[0] = true;
    }
  }

  /**
   * Date is a dateTime where time includes '.000z'.  This strips the 'T', the milliseconds and the time zone (UTC default)
   *
   * @param dateString
   */
  public formatDateString(dateString: string): string {
    let d1: string = dateString.replace('T', ' ');
    let d2: string = d1.replace(/\..+/,'');
    return d2;
  }
}
