import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SubcategoriesService {
    private url = environment.urlApi;

    constructor(private httpClient: HttpClient) {}

    createSubcategories(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/subcategories/create`, data);
    }

    deleteSubcategories(subcategoryUuid): Observable<any> {
        return this.httpClient.put(
            `${this.url}/subcategories/delete/${subcategoryUuid}`,
            {},
        );
    }
}
