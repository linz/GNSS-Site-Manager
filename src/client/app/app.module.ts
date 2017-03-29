import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { SiteInfoModule } from './site-info/site-info.module';
import { SelectSiteModule } from './select-site/select-site.module';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { AutoHeightDirective } from './shared/global/auto-height.directive';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ModalModule,
    AboutModule,
    SiteInfoModule,
    SelectSiteModule,
    UserRegistrationModule,
    HomeModule,
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AutoHeightDirective
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
