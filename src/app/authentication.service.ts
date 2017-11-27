import { Injectable } from '@angular/core';
//import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

import { User } from './users';
import { MessageService } from './message.service';



@Injectable()
export class AuthenticationService {
    constructor(
                private http: HttpClient,
                private messageService: MessageService) { }
 
  login(username: string, password: string) {
        const body = { username: 'user', password: 'picklerick' };
        //return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        return this.http.post('http://127.0.0.1:9200/api/get-token/', body)/*.pipe(
          tap(res => res),
          do( res => function(res) {
            let user = res.json();
            if (user && user.token) {
                user.firstName = 'User';
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
          })
        );*/

            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }
}
