import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from './users';


const userURL = 'http://86.64.78.32:30000/api/users/';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    //Gets every user on the database from the server.
    //Sends a jwt token to make sure we have access to this information
    //Returns the response to the function that requested the info. Error is handled at caller.
    getAll() {
        return this.http.get(userURL, this.jwt()).map((response: Response) => response.json());
    }

    //Gets user using user PK on the database from the server.
    //Sends a jwt token to make sure we have access to this information
    //Returns the response to the function that requested the info. Error is handled at caller.
    getById(id: number) {
        return this.http.get(userURL+'/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    //Creates a new user, using the user model. This sends it in a json format to the server.
    //Returns the response to the function that requested the info. Error is handled at caller.
    create(user: User) {
        return this.http.post(userURL + 'add/', user).map((response: Response) => response.json());
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
