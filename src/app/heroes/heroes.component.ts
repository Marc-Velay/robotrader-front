import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../items.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.getItems();
  }


  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => {
          this.items = items;
      });
  }
/*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(item: Item): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
*/
}
