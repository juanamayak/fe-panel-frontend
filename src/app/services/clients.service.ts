import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getClients(): Observable<any> {
        return this.httpClient.get(`${this.url}/clients`);
    }
}
