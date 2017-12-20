import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { GraphDataPoint } from './graphDataPoint';
import { MessageService } from './message.service';

@Injectable()
export class GraphDataService {

  private graphDataUrl = 'http://86.64.78.32:30000/api/Forex/2017/';  // URL to web api

  constructor(
    private http: Http,
    private messageService: MessageService) { }


  //Query the database for the item's data.
  //TODO: the url should be constructed using the item name instead of Forex. Limited data implied taking a shortcut for the moment.
  //Send jwt token to identify user and make sure he has authorization to query data.
  getGraphData() {
    return this.http.get(this.graphDataUrl, this.jwt()).map((response: Response) => response.json());
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

  private log(message: string) {
    this.messageService.add('GraphDataService: ' + message);
  }

  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            //let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            let headers = new Headers({ 'Authorization': 'Basic dXNlcjpwaWNrbGVyaWNr' });
            return new RequestOptions({ headers: headers });
        }
    }
}
