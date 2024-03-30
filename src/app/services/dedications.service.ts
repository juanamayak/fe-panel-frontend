import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DedicationsService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getDedications(): Observable<any>{
        return this.httpClient.get(`${this.url}/dedications`);
    }

    createDedications(data: any): Observable<any>{
        return this.httpClient.post(`${this.url}/dedications/create`, data);
    }

    updateDedications(dedicationUuid: any, data: any): Observable<any>{
        return this.httpClient.post(`${this.url}/dedications/update/${dedicationUuid}`, data);
    }

    deleteDedications(dedicationUuid): Observable<any>{
        return this.httpClient.put(`${this.url}/dedications/delete/${dedicationUuid}`, {});
    }
}
