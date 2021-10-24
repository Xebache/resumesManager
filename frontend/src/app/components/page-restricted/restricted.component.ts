import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-restricted',
    templateUrl: './restricted.component.html',
    styleUrls: ['./restricted.component.scss'],
})
export class RestrictedComponent implements OnInit {


    constructor(private router: Router) { }


    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 2000);
    }
    
}
