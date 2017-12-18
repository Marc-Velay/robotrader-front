import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../users';
import { Portfolio } from '../portfolio';
import { AlertService } from '../alert.service';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  currentUser: User;
  portfolio: Portfolio;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.portfolio = this.getPortfolio(this.currentUser.id);
  }


  getPortfolio(userId: number): void {
    this.portfolioService.getPortfolio(userId)
      .subscribe(portfolio => {
          this.portfolio = portfolio;
          localStorage.setItem('portfolio', JSON.stringify(portfolio));
          console.log(portfolio);
      });
  }
}
