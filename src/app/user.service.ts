import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from './users';


const userURL = 'http://86.64.78.32:30000/api/users/';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get(userURL, this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get(userURL+'/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post(userURL + 'add/', user, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper method
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Token ' + currentUser.token });
            //let headers = new Headers({ 'Authorization': 'Basic dXNlcjpwaWNrbGVyaWNr' });
            return new RequestOptions({ headers: headers });
        }
    }
}
