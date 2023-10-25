import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { defaultChartData } from "~/utils/constants";
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});


const FinancialChart = () => {

    const [chartData, setChartData] = useState(defaultChartData);
    const [chartHeight, setChartHeight] = useState(450);


    const state = {
        options: {
            series: [{
                data: chartData,
                }],
            chart: {
                type: 'candlestick' as const,
                height: 350
            },
            /*title: {
                text: 'CandleStick Chart',
                align: 'left'
            },*/
            xaxis: {
                type: 'datetime' as const,
                labels: {
                    style: {
                        colors: '#ffffff' // Color for X-axis labels
                    }
                }
            },
            yaxis: {
                tooltip: {
                    enabled: true
                },
                labels: {
                    style: {
                        colors: '#ffffff' // Color for X-axis labels
                    }
                }

            }
        }
    };

    // Adjust chart height when the window resizes
    const adjustChartHeight = () => {
            const newHeight = window.innerHeight*0.4;
            setChartHeight(newHeight);
    };

    useEffect(() => {
        // Add event listener to adjust chart height on window resize
        window.addEventListener("resize", adjustChartHeight);
        // Initial adjustment
        adjustChartHeight();
        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener("resize", adjustChartHeight);
    }, []);

    return (
        <div className="h-48">
            <ReactApexChart options={state.options} series={state.options.series} type="candlestick" height={chartHeight} />
        </div>
    );
  };

  export default FinancialChart;
