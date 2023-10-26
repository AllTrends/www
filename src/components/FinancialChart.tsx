import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
//import { SampleFinancialData } from "~/utils/financialData";
import { Button } from "./ui/button";
import useFinancialDataStore from "~/stores/financialDataStore";
import type { FinancialData } from "~/types";
import { ReduceFinancialData, financialDataToD } from "~/utils/financialData";


const FinancialChart = () => {

    const financialDataStore = useFinancialDataStore((state) => state.data);

    const [chartData, setChartData] = useState(ReduceFinancialData.aggregateData(financialDataStore, 15));
    const [chartHeight, setChartHeight] = useState(450);

    const state = {
        options: {
            series: [{
                data: chartData.map(el => financialDataToD(el)),
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

    const aggregateFinancialData = (d: FinancialData[], p: number) => {
        const newData = ReduceFinancialData.aggregateData(d, p, 120); //!! 5 -> 120
        setChartData(() => newData);
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
        <div>
            <div>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 1)}>1m</Button>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 5)}>5m</Button>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 15)}>15m</Button>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 30)}>30m</Button>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 60)}>1h</Button>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 240)}>4h</Button>
                <Button variant={"link"} onClick={()=>aggregateFinancialData(financialDataStore, 1440)}>1d</Button>
            </div>
            <ReactApexChart options={state.options} series={state.options.series} type="candlestick" height={chartHeight} />
        </div>
    );
  };

  export default FinancialChart;
