import { data } from "./data";
import "./App.css";

import Highcharts from "highcharts/highstock";
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import HighchartsReact from "highcharts-react-official";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

let ohlc: number[][] = [],
  volume: number[][] = [],
  dataLength = data.length,
  groupingUnits = [
    ["week", [1]],
    ["month", [1, 2, 3, 4, 6]],
  ],
  i = 0;

for (i; i < dataLength; i += 1) {
  ohlc.push([
    data[i][0], // the date
    data[i][1], // open
    data[i][2], // high
    data[i][3], // low
    data[i][4], // close
  ]);

  volume.push([
    data[i][0], // the date
    data[i][5], // the volume
  ]);
}

const DemoChartHighcharts = () => {
  const options = {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: "AAPL Historical",
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        type: "candlestick",
        name: "AAPL",
        data: ohlc,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits,
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default DemoChartHighcharts;
