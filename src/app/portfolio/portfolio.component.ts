import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../users';
import { Item } from '../item';
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

  constructor(
    private portfolioService: PortfolioService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getPortfolio(this.currentUser.id);
  }


  getPortfolio(userId: number) {
    this.portfolioService.getPortfolio(userId)
      .subscribe(portfolio => {
          this.portfolio = portfolio;
          localStorage.setItem('portfolio', JSON.stringify(portfolio));
          console.log(portfolio);
      });
  }
  save() {
    this.portfolioService.updatePortfolio(this.portfolio)
      .subscribe(() => this.alertService.success('You have successfully updated the portfolio name'));
  }


  delete(item:Item) {
    this.portfolioService.removeFromPortfolio(item.id)
      .subscribe(() => {
        this.alertService.success('You have successfully deleted this item from your portfolio'));
        this.getPortfolio(this.currentUser.id);
        this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
      }
  }
}
