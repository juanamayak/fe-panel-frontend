import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private url = environment.urlApi;

    constructor(private httpClient: HttpClient) {
    }

    getPaymentByOrder(orderId: any): Observable<any> {
        return this.httpClient.get(`${this.url}/payment/${orderId}`);
    }
}
