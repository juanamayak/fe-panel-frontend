import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getProduct(productUuid): Observable<any>{
        return this.httpClient.get(`${this.url}/products/${productUuid}`);
    }

    getProducts(): Observable<any>{
        return this.httpClient.get(`${this.url}/products`);
    }

    createProducts(data: any): Observable<any>{
        return this.httpClient.post(`${this.url}/products/create`, data);
    }

    getProductImages(productUuid): Observable<any>{
        return this.httpClient.get(`${this.url}/products/images/${productUuid}`);
    }
}
