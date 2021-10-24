import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { plainToClass } from 'class-transformer';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { User, Role } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import * as _ from 'lodash';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

    public user?: User;

    constructor(
        private route:ActivatedRoute, 
        private userService: UserService,
        public authService: AuthenticationService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {}

    get canUpdateProfile(): boolean {
        return this.user === this.authService.currentUser;
    }

    

    edit(user: User) {
        const dlg = this.dialog.open(UserEditComponent, { data: { user, isNew: false } });
        dlg.beforeClosed().subscribe(res => {
            if (res) {
                _.assign(user, res);
                res = plainToClass(User, res);
                this.userService.update(res).subscribe(res => {
                    if (!res) {
                        this.snackBar.open(`There was an error at the server. The update has not been done! Please try again.`, 'Dismiss', { duration: 10000 });
                        // this.refresh(user.pseudo);
                    }
                });
            }
        });
    }



    // refresh(pseudo: string) {
    //     this.userService.getOne(pseudo).subscribe(user => {
    //         // assigne les données récupérées au datasource
    //         this.dataSource.data = user;
    //         // restaure l'état du datasource (tri et pagination) à partir du state
    //         this.state.restoreState(this.dataSource);
    //         // restaure l'état du filtre à partir du state
    //         this.filter = this.state.filter;
    //     });
    // }

    getParamFromRoute(): string {
        let pseudo = ''
        this.route.params
            .subscribe(params => pseudo = params.pseudo);
        return pseudo
    }

    getUser(pseudo: string): void {
        this.userService.getOne(pseudo)
            .subscribe(user => {this.user = user
            console.log(this.user)});
    }

    ngOnInit(): void {
        const pseudo = this.getParamFromRoute();
        this.getUser(pseudo);
    }
}

    


