import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDataDTO } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserDataDTO>;
    public currentUser: Observable<UserDataDTO>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserDataDTO>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserDataDTO {
        return this.currentUserSubject.value;
    }

    signup(user: UserDataDTO) {
        return this.http.post<any>('http://localhost:3000/auth/register', user)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                return user;
            }));
    }

    login(email: string, password: string) {
        return this.http.post<any>('http://localhost:3000/auth/login', { email, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                return user;
            }));
    }

    refresh(token: string) {
        return this.http.post<any>('http://localhost:3000/auth/refresh', { refresh_token: token })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
