import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({ 
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


    loginForm!: FormGroup;
    loading = false;    // utilisé en HTML pour désactiver le bouton pendant la requête de login
    submitted = false;  // retient si le formulaire a été soumis ; utilisé pour n'afficher les erreurs que dans ce cas-là (voir template)
    returnUrl!: string;
    ctlPseudo!: FormControl;
    ctlPassword!: FormControl;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUser) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.ctlPseudo = this.formBuilder.control('', Validators.required);
        this.ctlPassword = this.formBuilder.control('', Validators.required);
        this.loginForm = this.formBuilder.group({
            pseudo: this.ctlPseudo,
            password: this.ctlPassword
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    // On définit ici un getter qui permet de simplifier les accès aux champs du formulaire dans le HTML
    get f() { return this.loginForm.controls; }

    /**
     * Cette méthode est bindée sur l'événement onsubmit du formulaire. On va y faire le
     * login en faisant appel à AuthenticationService.
     */
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) return;

        this.loading = true;
        this.authenticationService.login(this.f.pseudo.value, this.f.password.value)
            .subscribe(
                // si login est ok, on navigue vers la page demandée
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                // en cas d'erreurs, on reste sur la page et on les affiche
                error => {
                    const errors = error.error.errors;
                    for (let field in errors) {
                        this.loginForm.get(field.toLowerCase())?.setErrors({ custom: errors[field] })
                    }
                    this.loading = false;
                });
    }
}