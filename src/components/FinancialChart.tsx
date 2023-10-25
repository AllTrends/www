import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
import { SampleFinancialData } from "~/utils/financialData";
import { Button } from "./ui/button";
import useChartDataStore from "~/stores/chartDataStore";


const FinancialChart = () => {

    const chartDataStore = useChartDataStore((state) => state.data);

    const [timeRange, setTimeRange] = useState(30);
    const [chartData, setChartData] = useState(chartDataStore);
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

    const changeTimeRange = (mins: number) => {
        setTimeRange(() => mins);
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

    useEffect(() => {
        setChartData(SampleFinancialData
            .create(120, timeRange).map(e => ({
                x: new Date(e.time),
                y: [e.open, e.high, e.low, e.close],
            })));
    }, [timeRange])

    return (
        <div>
            <div>
                <Button variant={"link"} onClick={()=>changeTimeRange(5)}>5m</Button>
                <Button variant={"link"} onClick={()=>changeTimeRange(15)}>15m</Button>
                <Button variant={"link"} onClick={()=>changeTimeRange(30)}>30m</Button>
                <Button variant={"link"} onClick={()=>changeTimeRange(60)}>1h</Button>
                <Button variant={"link"} onClick={()=>changeTimeRange(240)}>4h</Button>
                <Button variant={"link"} onClick={()=>changeTimeRange(1440)}>1d</Button>
            </div>
            <ReactApexChart options={state.options} series={state.options.series} type="candlestick" height={chartHeight} />
        </div>
    );
  };

  export default FinancialChart;
