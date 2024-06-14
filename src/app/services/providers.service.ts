import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProvidersService {
    private url = environment.urlApi;

    constructor(private httpClient: HttpClient) {}

    gerProviders(): Observable<any> {
        return this.httpClient.get(`${this.url}/providers`);
    }

    createProviders(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/providers/create`, data);
    }

    updateProviders(providerUuid: any, data): Observable<any> {
        return this.httpClient.put(
            `${this.url}/providers/update/${providerUuid}`,
            data,
        );
    }

    deleteProviders(providerUuid, data): Observable<any> {
        return this.httpClient.put(
            `${this.url}/providers/delete/${providerUuid}`,
            data,
        );
    }
}
