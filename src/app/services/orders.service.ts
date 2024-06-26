import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private url = environment.urlApi;

    constructor(private httpClient: HttpClient) {}

    getOrder(orderUuid: any): Observable<any> {
        return this.httpClient.get(`${this.url}/orders/${orderUuid}`);
    }

    getOrders(): Observable<any> {
        return this.httpClient.get(`${this.url}/orders`);
    }

    changeStatus(orderUuid: any, data): Observable<any> {
        return this.httpClient.put(`${this.url}/orders/change-status/${orderUuid}`, data);
    }
}
