import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { plainToClass } from 'class-transformer'; 


@Injectable({ providedIn: 'root'})
export class UserService {

    constructor(
        private http: HttpClient, 
        @Inject('BASE_URL') private baseUrl: string) {}


    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}users`)
            .pipe(map(res => 
                plainToClass(User, res)
            ));
    }


    getOne(pseudo: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}users/${pseudo}`)
            .pipe(map(res => 
                plainToClass(User, res),
                catchError(err => of(null))
            ));
    }


    public update(u: User): Observable<boolean> {
        return this.http.put<User>(`${this.baseUrl}members`, u).pipe(
            map(res => true),
            catchError(err => {
                console.error(err);
                return of(false);
            })
        );
    }


    public delete(u: User): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}members/${u.pseudo}`).pipe(
            map(res => true),
            catchError(err => {
                console.error(err);
                return of(false);
            })
        );
    }


    public add(u: User): Observable<boolean> {
        return this.http.post<User>(`${this.baseUrl}members`, u).pipe(
            map(res => true),
            catchError(err => {
                console.error(err);
                return of(false);
            })
        );
    }

}
