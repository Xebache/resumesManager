import { Component } from '@angular/core';
import { Role } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent {

    isExpanded = false;
    panelOpenState = false;

    constructor(public authService: AuthenticationService) {}

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    get isAdmin(): boolean {
        return this.authService.currentUser?.role === Role.Admin;
    }
    
}
