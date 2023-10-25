import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { defaultChartData } from "~/utils/constants";
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});


const FinancialChart = () => {

    const [chartData, setChartData] = useState(defaultChartData)

    const state = {
        options: {
            series: [{
                data: chartData,
                }],
            chart: {
                type: 'candlestick',
                height: 350
            },
            /*title: {
                text: 'CandleStick Chart',
                align: 'left'
            },*/
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }

            }
        }
    };

    return (
        <ReactApexChart options={state.options} series={state.options.series} type="candlestick" height={350} />
    );
  };

  export default FinancialChart;
