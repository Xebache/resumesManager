import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-unknown',
    templateUrl: './unknown.component.html',
    styleUrls: ['./unknown.component.scss'],
})
export class UnknownComponent {


    constructor(private router: Router) { }


    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 2000);
    }


}
