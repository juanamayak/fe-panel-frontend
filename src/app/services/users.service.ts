import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public jwtToken = 'TK1983!';
    public profileToken = 'PF849!';

    constructor() {
    }

    getToken() {
        const token = sessionStorage.getItem(this.jwtToken);

        if (token) {
            return token;
        }

        return null;
    }
}
