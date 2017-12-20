import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item }         from '../item';
import { ItemService }  from '../items.service';

import { GraphDataPoint } from '../graphDataPoint';
import { GraphDataService } from '../graphData.service';

import { PortfolioService } from '../portfolio.service';

import { AlertService } from '../alert.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: [ './item-detail.component.css' ]
})
export class ItemDetailComponent implements OnInit {
  @Input() item: Item;
  graphData: GraphDataPoint[];

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  source: any =
  {
      datatype: 'json',
      datafields: [
          { name: 'timestamp' },
          { name: 'opening' },
          { name: 'high' },
          { name: 'low' },
          { name: 'closing' }
      ],
      localdata: this.graphData
  };
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private graphDataService: GraphDataService,
    private portfolioService: PortfolioService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getItem();
    this.getGraphData();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  //Go back to where the item was clicked to
  goBack(): void {
    this.location.back();
  }

  //Add the clicked item to the portfolio
  add() {
    console.log('clicked');
    this.portfolioService.addToPortfolio(this.item.id).subscribe(() => this.alertService.success('You have successfully added this item to your portfolio'));
      console.log('completed');
  }


  getGraphData(): void {
    this.graphDataService.getGraphData()
    .subscribe(graphData => {
      this.graphData = graphData;
      this.source.localdata = this.graphData;
      this.dataAdapter = new jqx.dataAdapter(this.source, { async: true, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.localdata + '" : ' + error); } });
      console.log(this.dataAdapter);
    });
  }

    dataAdapter = new jqx.dataAdapter(this.source, { async: true, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.localdata + '" : ' + error); } });

    toolTipCustomFormatFn = (value: any, itemIndex: any, serie: any, group: any, categoryValue: any, categoryAxis: any) => {
        let dataItem = this.dataAdapter.records[itemIndex];
        let volume = dataItem.SPVolume;
        console.log(value);
        return '<DIV style="text-align:left"><b>Date: ' +
            categoryValue.getDate() + '-' + this.months[categoryValue.getMonth()] + '-' + categoryValue.getFullYear() +
            '</b><br />Open price: $' + value.opening +
            '</b><br />Close price: $' + value.closing +
            '</b><br />Low price: $' + value.low +
            '</b><br />High price: $' + value.high +
        '</DIV>';
    };

    padding: any = { left: 5, top: 5, right: 5, bottom: 5 };

    //Wraps the info regarding axies
    xAxis: any =
    {
        dataField: 'timestamp',
        labels: {
            formatFunction: (value) => {
                return value.getHours() + ':' + value.getMinutes();
            }
        },
        type: 'date',
        valuesOnTicks: true,
        minValue: new Date("2017-09-01T00:00:00"),
        maxValue: new Date("2017-09-01T00:28:00"),
        rangeSelector: {
            padding: { left: 25, right: 10, top: 10, bottom: 10 },
            backgroundColor: 'white',
            dataField: 'closing',
            baseUnit: 'month',
            serieType: 'area',
            gridLines: { visible: false },
            labels:
            {
                formatFunction: (value: any) => {
                    return value;
                }
            }
        }
    };

    //variable that wraps all the info used inside the candlechart graph.
    seriesGroups: any[] =
    [
        {
            type: 'candlestick',
            columnsMaxWidth: 15,
            columnsMinWidth: 5,
            toolTipFormatFunction: this.toolTipCustomFormatFn,
            valueAxis:
            {
                description: 'Item name<br>'
            },
            series: [
                {
                    dataFieldClose: 'closing',
                    displayTextClose: 'Closing price',
                    dataFieldOpen: 'opening',
                    displayTextOpen: 'Opening price',
                    dataFieldHigh: 'high',
                    displayTextHigh: 'High price',
                    dataFieldLow: 'low',
                    displayTextLow: 'Low price',
                    displayText: 'Item Name',
                    lineWidth: 1
                }
            ]
        },
        {
            type: 'line',
            valueAxis:
            {
                position: 'right',
                title: { text: '<br>Daily Volume' },
                gridLines: { visible: false },
                labels: {
                    formatFunction: (value: string) => {
                        return value;
                    }
                }
            },
            series: [
                {
                    dataField: 'opening',
                    displayText: 'opening',
                    lineWidth: 1
                }
            ]
        }
    ];
}
