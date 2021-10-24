import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as _ from 'lodash-es';

import { Moment } from 'moment';
import * as moment from 'moment';

import { User, Role } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ThrowStmt } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit{


    public frm!: FormGroup;
    public ctlPseudo!: FormControl;
    public ctlLastname!: FormControl;
    public ctlFirstname!: FormControl;
    public ctlEmail!: FormControl
    public ctlPassword!: FormControl;
    public ctlBirthdate!: FormControl;
    public ctlRole!: FormControl;
    public isNew: boolean;
    public maxDate: Moment = moment().subtract(18, 'years');


    constructor(
        public dialogRef: MatDialogRef<UserEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { user: User; isNew: boolean; },
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthenticationService) {

            this.ctlPseudo = this.fb.control('', [
                Validators.required,
                Validators.minLength(3),
                this.forbiddenValue('abc')
            ], [this.pseudoUsed()]);
    
            this.ctlPassword = this.fb.control('', data.isNew ? [Validators.required, Validators.minLength(3)] : []);
            this.ctlLastname = this.fb.control(null, [Validators.minLength(3)]);
            this.ctlFirstname = this.fb.control(null, [Validators.minLength(3)]);
            // !!!! validation email !!!!
            this.ctlEmail = this.fb.control('', data.isNew ? [Validators.required, Validators.minLength(3)] : []);
            this.ctlBirthdate = this.fb.control(null, [this.validateBirthdate()]);
            this.ctlRole = this.fb.control(Role.User, []);

            this.frm = this.fb.group({
                pseudo: this.ctlPseudo,
                password: this.ctlPassword,
                email: this.ctlEmail,
                lastname: this.ctlLastname,
                firstname: this.ctlFirstname,
                birthDate: this.ctlBirthdate,
                role: this.ctlRole
            });
    
            this.isNew = data.isNew;
            this.frm.patchValue(data.user);
    }

    get canUpdateRole(): boolean {
        return this.authService.currentUser?.role === Role.Admin;
    }

    // Validateur bidon qui vérifie que la valeur est différente
    forbiddenValue(val: string): any {
        return (ctl: FormControl) => {
            if (ctl.value === val) {
                return { forbiddenValue: { currentValue: ctl.value, forbiddenValue: val } };
            }
            return null;
        };
    }


    validateBirthdate(): any {
        return (ctl: FormControl) => {
            const birthDate: Moment = ctl.value;
            const today: Moment = moment();
            if (today < birthDate)
                return { futureBorn: true }
            var age = moment().diff(birthDate, 'years');
            if (age < 18)
                return { tooYoung: true };
            return null;
        };
    }


    // Validateur asynchrone qui vérifie si le pseudo n'est pas déjà utilisé par un autre membre
    pseudoUsed(): any {
        let timeout: NodeJS.Timer;
        return (ctl: FormControl) => {
            clearTimeout(timeout);
            const pseudo = ctl.value;
            return new Promise(resolve => {
                timeout = setTimeout(() => {
                    if (ctl.pristine) {
                        resolve(null);
                    } else {
                        this.userService.getOne(pseudo).subscribe(user => {
                            resolve(user ? { pseudoUsed: true } : null);
                        });
                    }
                }, 300);
            });
        };
    }


    onNoClick(): void {
        this.dialogRef.close();
    }


    update() {
        this.dialogRef.close(this.frm.value);
    }


    cancel() {
        this.dialogRef.close();
    }


    ngOnInit(): void {
        
    }

}

