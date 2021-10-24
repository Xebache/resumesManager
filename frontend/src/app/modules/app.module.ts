import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { SharedModule } from './shared.module';
import { SetFocusDirective } from '../directives/setFocus.directive';
import { AppRoutes } from '../routing/app.routing';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';

import { AppComponent } from '../components/app/app.component';
import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { NavProfileComponent } from '../components/nav-profile/nav-profile.component';
import { LoginComponent } from '../components/page-login/login.component';
import { HomeComponent } from '../components/page-home/home.component';
import { UsersListComponent } from '../components/users-list/users-list.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { UserEditComponent } from '../components/user-edit/user-edit.component';
import { RestrictedComponent } from '../components/page-restricted/restricted.component';
import { UnknownComponent } from '../components/page-unknown/unknown.component';
import { UserProfileSkillsComponent } from '../components/user-profile-skills/user-profile-skills.component';
import { UserProfileEducationComponent } from '../components/user-profile-education/user-profile-education.component';
import { UserProfileExperienceComponent } from '../components/user-profile-experience/user-profile-experience.component';
import { UserProfileLanguageComponent } from '../components/user-profile-language/user-profile-language.component';



export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href + "api/";
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        NavProfileComponent,
        HomeComponent,
        UsersListComponent,
        UserProfileComponent,
        UserProfileEducationComponent,
        UserProfileExperienceComponent,
        UserProfileLanguageComponent,
        UserProfileSkillsComponent,
        UserEditComponent,
        LoginComponent,
        RestrictedComponent,
        UnknownComponent,
        SetFocusDirective,
    ],
    entryComponents: [
        UserEditComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutes,
        BrowserAnimationsModule,
        SharedModule
        
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: ['D/M/YYYY'],
                },
                display: {
                    dateInput: 'D/M/YYYY',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'D/M/YYYY',
                    monthYearA11yLabel: 'MMM YYYY',
                },
            },
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
