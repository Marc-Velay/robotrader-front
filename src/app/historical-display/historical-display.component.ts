import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GraphDataPoint } from '../graphDataPoint';
import { GraphDataService } from '../graphData.service';

import { GraphDataPointSimple } from '../graphDataPointSimple';
import { GraphDataSimpleService } from '../graphDataSimple.service';

@Component({
  selector: 'app-historical-display',
  templateUrl: './historical-display.component.html',
  styleUrls: ['./historical-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricalDisplayComponent implements OnInit {
  graphData: GraphDataPoint[];
  graphDataSimple: GraphDataPointSimple[];

  graphDataOpening: string[];
  graphDataClosing: string[];
  graphDataLow: string[];
  graphDataHigh: string[];
  graphDataDate = [];

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  graphDataSim = [
    {"id":1, "opening":"1", "date": "2017/10/9"},
    {"id":2, "opening":"2", "date": "2017/10/8"},
    {"id":3, "opening":"3", "date": "2017/10/7"},
    {"id":4, "opening":"4", "date": "2017/10/6"},
  ]

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
      //url: './nasdaq_vs_sp500_detailed.txt'
      localdata: this.graphData
  };

  source2: any =
  {
      datatype: 'json',
      datafields: [
          { name: 'date' },
          { name: 'opening' },
      ],
      //url: './nasdaq_vs_sp500_detailed.txt'
      localdata: this.graphDataSimple
  };

  constructor(private graphDataService: GraphDataService, private graphDataSimpleService: GraphDataSimpleService) { }

  ngOnInit() {
    this.getGraphData();
    //this.getGraphDataSimple();
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
/*getGraphDataSimple(): void {
    this.graphDataSimpleService.getGraphDataSimple()
    .subscribe(graphDataSimple => {
      this.graphDataSimple = graphDataSimple;
      console.log(this.graphDataSimple);
      console.log(this.dataAdapter2);
      this.source2.localdata = this.graphDataSimple;
      this.dataAdapter2 = new jqx.dataAdapter(this.source2, { async: true, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source2.localdata + '" : ' + error); } });

    });
  }
*/

/*dataAdapter2: any = new jqx.dataAdapter(this.source2, { async: true, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source2.localdata + '" : ' + error); } });

padding: any = { left: 10, top: 5, right: 10, bottom: 5 };

titlePadding: any = { left: 50, top: 0, right: 0, bottom: 10 };

xAxis: any =
{
    dataField: 'date',
    formatFunction: (value: any) => {
        return value.getDate() + '-' + this. months[value.getMonth()] + '-' + value.getFullYear();
    },
    type: 'date',
    baseUnit: 'day',
    valuesOnTicks: true,
    minValue: '6-10-2017',
    maxValue: '10-10-2017',
    tickMarks: {
        visible: true,
        interval: 1,
        color: '#BCBCBC'
    },
    unitInterval: 1,
    gridLines: {
        visible: true,
        interval: 1,
        color: '#BCBCBC'
    },
    labels: {
        angle: -45,
        rotationPoint: 'topright',
        offset: { x: 0, y: -25 }
    }
};
valueAxis: any =
    {
        visible: true,
        title: { text: 'Daily Closing Price<br>' },
        tickMarks: { color: '#BCBCBC' }
    };

seriesGroups: any =
  [
      {
          type: 'line',
          series: [
              { dataField: 'opening', displayText: 'S&P 500' }
          ]
      }
  ];
*/



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
