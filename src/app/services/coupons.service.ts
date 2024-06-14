import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CouponsService {
    private url = environment.urlApi;

    constructor(private httpClient: HttpClient) {}

    getCoupons(): Observable<any> {
        return this.httpClient.get(`${this.url}/coupons`);
    }

    createCoupons(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/coupons/create`, data);
    }

    updateCoupons(couponUuid: any, data: any): Observable<any> {
        return this.httpClient.post(
            `${this.url}/coupons/update/${couponUuid}`,
            data,
        );
    }

    updateStatus(couponUuid, data): Observable<any> {
        return this.httpClient.put(
            `${this.url}/coupons/status/${couponUuid}`,
            data,
        );
    }

    deleteCoupon(couponUuid): Observable<any> {
        return this.httpClient.put(
            `${this.url}/coupons/delete/${couponUuid}`,
            {},
        );
    }
}
