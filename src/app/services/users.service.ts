import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private url = environment.urlApi;

    public jwtToken = 'TK1983!';
    public profileToken = 'PF849!';

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    login(data): Observable<any> {
        return this.httpClient.post(`${this.url}/users/login`, data);
    }

    getUsers(): Observable<any>{
        return this.httpClient.get(`${this.url}/users`);
    }

    getToken() {
        const token = sessionStorage.getItem(this.jwtToken);

        if (token) {
            return token;
        }

        return null;
    }
}
