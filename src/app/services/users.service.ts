import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private url = environment.urlApi;

    public jwtToken = 'TK1983!';
    public profileToken = 'PF849!';

    constructor(private httpClient: HttpClient) {}

    login(data): Observable<any> {
        return this.httpClient.post(`${this.url}/users/login`, data);
    }

    getUsers(): Observable<any> {
        return this.httpClient.get(`${this.url}/users`);
    }

    createUsers(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/users/create`, data);
    }

    updateUsers(userUuid: any, data: any): Observable<any> {
        return this.httpClient.post(
            `${this.url}/users/update/${userUuid}`,
            data,
        );
    }

    updateStatus(userUuid, data): Observable<any> {
        return this.httpClient.put(
            `${this.url}/users/status/${userUuid}`,
            data,
        );
    }

    deleteUser(userUuid): Observable<any> {
        return this.httpClient.put(`${this.url}/users/delete/${userUuid}`, {});
    }

    getToken() {
        const token = sessionStorage.getItem(this.jwtToken);

        if (token) {
            return token;
        }

        return null;
    }
}
