import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/page-home/home.component';
import { UsersListComponent } from '../components/users-list/users-list.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';

import { RestrictedComponent } from '../components/page-restricted/restricted.component';
import { LoginComponent } from '../components/page-login/login.component';
import { UnknownComponent } from '../components/page-unknown/unknown.component';
import { AuthenticationGuard as AuthGuard } from '../services/authentication.guard';
import { Role } from '../models/user';


const appRoutes: Routes = [
    {
        path: '', 
        component: HomeComponent, pathMatch: 'full'
    },
    {
        path: 'profile/:pseudo', 
        component: UserProfileComponent
    },
    {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { 
        path: 'restricted', 
        component: RestrictedComponent 
    },
    { 
        path: '**', 
        component: UnknownComponent 
    }
]

export const AppRoutes = RouterModule.forRoot(appRoutes);