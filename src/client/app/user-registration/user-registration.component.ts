import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';

@Component({
    moduleId: module.id,
    selector: 'sd-user-registration',
    templateUrl: 'user-registration.component.html',
})
export class UserRegistrationComponent {

    userRegistrationForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        organisation: [''],
        position: [''],
        email: [''],
        phone: [''],
        remarks: [''],
    });

    constructor(
        private location: Location,
        private formBuilder: FormBuilder,
        private userService: UserAuthService,
        private dialogs: DialogService,
    ) {}

    public cancel() {
        this.location.back();
    }

    public submit() {
        console.log(this.userRegistrationForm.getRawValue());
        this.userService.requestNewUser(this.userRegistrationForm.getRawValue())
            .subscribe(() =>
                this.dialogs.showNotificationDialog(
                    `Thank you for registering. You will be contacted by GNSS Operations
                    Team at Geoscience Australia regarding your login details.`,
                    () => this.location.back()
                )
            );
    }
}
