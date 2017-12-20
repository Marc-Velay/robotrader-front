import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Portfolio } from './portfolio'


@Injectable()
export class PortfolioService {
  portfolio: Portfolio;
  private portfolioUrl = 'http://86.64.78.32:30000/api/portfolio';  // URL to web api

  constructor(
    private http: Http,
    private messageService: MessageService) { }

  //We get the portfolio associated with the logged in user.
  getPortfolio(userID: number) {
    const url = `${this.portfolioUrl}/get/${userID}/`;  //ie http://86.64.78.32:30000/api/portfolio/get/1/ for user pk 1
    return this.http.get(url, this.jwt()).map((response: Response) => response.json()); //return the response to the requesting function. Error is handled on caller.
  }

  //For the moment, this function only updates the name, sending the new one in a json.
  updatePortfolio(portfolio: Portfolio) {
    const url = `${this.portfolioUrl}/update/${portfolio.id}/`;
    const body = {"name": portfolio.name};
    return this.http.put(url, body, this.jwt()).map((response: Response) => response.json());
  }

  //Add item to the portfolio using portfolio ID and item ID.
  addToPortfolio(itemID: number) {
    const url = `${this.portfolioUrl}/item/link/${itemID}/`;
    //If the user hasnt visited the page 'portfolio' yet, he doesnt have the portfolio ID,
    //We need to query it before updating its item list.
    if(!localStorage.getItem('portfolio')) {
      this.getPortfolio(JSON.parse(localStorage.getItem('currentUser')))
      .subscribe(portfolio => {
          //When we receive the portfolio, we get its ID and update it with the new item.
          this.portfolio = portfolio;
          localStorage.setItem('portfolio', JSON.stringify(portfolio));
          const body = { "id": this.portfolio.id };
          return this.http.post(url, body, this.jwt()).map((response: Response) => response.json());
      });
    } else { // In case the user already has a loaded portfolio.
      this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
      const body = { "id": this.portfolio.id };
      return this.http.post(url, body, this.jwt()).map((response: Response) => response.json());
    }
  }
  //Remove an item from a portfolio using portfolio ID and item ID
  removeFromPortfolio(itemID: number) {
    const url = `${this.portfolioUrl}/item/remove/${itemID}/`;
    //If the user hasnt visited the page 'portfolio' yet, he doesnt have the portfolio ID,
    //We need to query it before updating its item list.
    if(!localStorage.getItem('portfolio')) {
      this.getPortfolio(JSON.parse(localStorage.getItem('currentUser')))
      .subscribe(portfolio => {
          this.portfolio = portfolio;
          localStorage.setItem('portfolio', JSON.stringify(portfolio));
          const body = { "id": this.portfolio.id };
          return this.http.post(url, body, this.jwt()).map((response: Response) => response.json());
      });
    } else { // In case the user already has a loaded portfolio.
      this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
      const body = { "id": this.portfolio.id };
      return this.http.post(url, body, this.jwt()).map((response: Response) => response.json());
    }
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
    this.messageService.add('PortfolioService: ' + message);
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
