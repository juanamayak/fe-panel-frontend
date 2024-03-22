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

    getProducts(): Observable<any>{
        return this.httpClient.get(`${this.url}/products`);
    }
}
