import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getCategories(): Observable<any>{
        return this.httpClient.get(`${this.url}/categories`);
    }
}
