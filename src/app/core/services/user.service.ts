import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserDataDTO, DBUserDataDTO } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserDataDTO[]>('http://localhost:3000/users');
    }

    findOne(id: number) {
        return this.http.get(`http://localhost:3000/users/findOne?id=${ id }`);
    }

    update(user: DBUserDataDTO) {
        return this.http.put('http://localhost:3000/users/', user);
    }
}
