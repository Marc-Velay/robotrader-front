import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item }         from '../item';
import { ItemService }  from '../items.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() item: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

 /*save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }*/
}
