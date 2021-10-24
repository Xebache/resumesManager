import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
    selector: 'app-nav-profile',
    templateUrl: './nav-profile.component.html',
    styleUrls: ['./nav-profile.component.scss']
})


export class NavProfileComponent{

    constructor(private router: Router, public authService: AuthenticationService) {}
    
    logoutHandler() {
        this.authService.logout();
        this.router.navigate([""]);
    }

}