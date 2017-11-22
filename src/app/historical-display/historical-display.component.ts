import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GraphDataPoint } from '../graphDataPoint';
import { GraphDataService } from '../graphData.service';

@Component({
  selector: 'app-historical-display',
  templateUrl: './historical-display.component.html',
  styleUrls: ['./historical-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricalDisplayComponent implements OnInit {
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
  constructor(private graphDataService: GraphDataService) { }

  ngOnInit() {
    this.getGraphData();
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

    xAxis: any =
    {
        dataField: 'timestamp',
        labels: {
            formatFunction: (value) => {
                return value.getHours() + ':' + value.getMinutes(); //value.getDate() + '-' + this.months[value.getMonth()] + '\'' + value.getFullYear().toString().substring(2);
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
                    return value;//this.months[value.getMonth()] + '\'' + value.getFullYear().toString().substring(2);
                }
            }
        }
    };

    seriesGroups: any[] =
    [
        {
            type: 'candlestick',
            columnsMaxWidth: 15,
            columnsMinWidth: 5,
            toolTipFormatFunction: this.toolTipCustomFormatFn,
            valueAxis:
            {
                description: 'S&P 500<br>'
            },
            series: [
                {
                    dataFieldClose: 'closing',
                    displayTextClose: 'S&P Close price',
                    dataFieldOpen: 'opening',
                    displayTextOpen: 'S&P Open price',
                    dataFieldHigh: 'high',
                    displayTextHigh: 'S&P High price',
                    dataFieldLow: 'low',
                    displayTextLow: 'S&P Low price',
                    displayText: 'S&P 500',
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
