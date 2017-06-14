import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { SiteLocationComponent } from './site-location.component';
import { SiteLocationModule } from './site-location.module';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ApplicationSaveState, ApplicationState, SiteLogService } from '../shared/site-log/site-log.service';
import { DialogService } from '../shared/global/dialog.service';

export function main() {
    describe('BannerComponent (inline template x)', () => {

        let comp: SiteLocationComponent;
        let fixture: ComponentFixture<SiteLocationComponent>;

        let fakeUserAUthService = {
            hasAuthorityToEditSite() {
                return true;
            }
        };

        let fakeSiteLogService = {
            getApplicationStateSubscription(): Observable<any> {
                return new Observable((observer: Subscriber<any>) => {
                    let applicationState: ApplicationState = {
                        applicationFormModified: false,
                        applicationFormInvalid: false,
                        applicationSaveState: ApplicationSaveState.idle
                    };
                    observer.next(applicationState);
                    observer.complete();
                });
            }
        };

        let fakeDialogService = {
            hasAuthorityToEditSite() {
                return true;
            }
        };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    SiteLocationModule,
                    FormsModule, ReactiveFormsModule,
                    RouterTestingModule,
                ],
                providers: [
                    {provide: UserAuthService, useValue: fakeUserAUthService},
                    {provide: SiteLogService, useValue: fakeSiteLogService},
                    {provide: DialogService, useValue: fakeDialogService},
                ]
            }).compileComponents();  // compile template and css;
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteLocationComponent);

            comp = fixture.componentInstance; // BannerComponent test instance
            comp.parentForm = new FormGroup({});
            fixture.detectChanges();
        });

        it('must be defined', () => {
            expect(fixture).toBeDefined();
            expect(comp).toBeDefined();
        });

        it('should have invalid fields when 1 is changed in group', () => {
            let x: AbstractControl = comp.cartesianPositionForm.controls['x'];
            let y: AbstractControl = comp.cartesianPositionForm.controls['y'];
            let z: AbstractControl = comp.cartesianPositionForm.controls['z'];
            // Setting one or two of x,y,z should cause all to become required and others to be invalid
            x.setValue("7");
            fixture.detectChanges();
            expect(x.valid).toBeTruthy();
            expect(y.valid).toBeFalsy();
            expect(z.valid).toBeFalsy();

            y.setValue("77");
            fixture.detectChanges();
            expect(x.valid).toBeTruthy();
            expect(y.valid).toBeTruthy();
            expect(z.valid).toBeFalsy();

            // Set them all and they should now be valid
            z.setValue("777");
            fixture.detectChanges();
            expect(x.valid).toBeTruthy();
            expect(y.valid).toBeTruthy();
            expect(z.valid).toBeTruthy();

            // take away all the values and they should be valid also
            x.setValue("");
            y.setValue("");
            z.setValue("");
            fixture.detectChanges();
            expect(x.valid).toBeTruthy();
            expect(y.valid).toBeTruthy();
            expect(z.valid).toBeTruthy();
        })
    });
}
