import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { GnssReceiverItemComponent } from '../gnss-receiver/gnss-receiver-item.component';
import { SurveyedLocalTieItemComponent } from './surveyed-local-tie-item.component';

/**.
 * This class represents a group of Surveyed Local Ties.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-ties-group',
    templateUrl: 'surveyed-local-ties-group.component.html',
})
export class SurveyedLocalTiesGroupComponent extends AbstractGroup<SurveyedLocalTieViewModel> implements OnInit {
    static compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        let date1: string = obj1.dateMeasured;
        let date2: string = obj2.dateMeasured;
        return AbstractGroup.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.surveyedLocalTies);
            this.setupForm('surveyedLocalTies');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.surveyedLocalTies);
        console.log('SurveyedLocalTies (Original): ', this.getItemsOriginalCollection());
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set in the @Input
        // this.setupForm();
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        return SurveyedLocalTiesGroupComponent.compare(obj1, obj2);
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(blank?: boolean): SurveyedLocalTieViewModel {
        return new SurveyedLocalTieViewModel();
    }

    newItemFormInstance(): FormGroup {
        return SurveyedLocalTieItemComponent.newFormInstance(this.formBuilder);
    }
}
