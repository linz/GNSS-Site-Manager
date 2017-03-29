import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './user-registration.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'userRegistration', component: UserRegistrationComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserRegistrationRoutingModule { }
