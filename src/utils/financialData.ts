/*
This file contains helper functions to be able to generate mock-up data and aggregate it to candles of different sizes.
*/

import type { FinancialData, D } from '~/types';

export function financialDataToD(f: FinancialData): D {
    return {
      x: new Date(f.time*1000),
      y: [f.open, f.high, f.low, f.close]
    };
};
  
export function dToFinancialData(d: D): FinancialData {
    return {
      time: Math.floor(d.x.getTime() / 1000),
      label: String(d.x),
      open: d.y[0]!,
      high: d.y[1]!,
      low: d.y[2]!,
      close: d.y[3]!,
      volume: 0,
    }
};

/*
This class generates a random array of financial data aggregated to the minute level.
*/
export class SampleFinancialData {

    public static create(items?: number, rangeMins?: number): FinancialData[] {
        // initial values
        let v = 10000;
        let o = 0.0492;
        let h = Math.round((o + (Math.random() * 0.001)) * 10000) / 10000;
        let l = Math.round((o - (Math.random() * 0.001)) * 10000) / 10000;
        let c = Math.round((l + (Math.random() * (h - l))) * 10000) / 10000;

        if (items === undefined) {
            items = 5;
        }

        if (rangeMins === undefined) {
            rangeMins = 30;
        }

        //const today = new Date();
        const end = new Date().getTime();
        let time = end - items * rangeMins * 60 * 1000;

        const data: FinancialData[] = [];
        for (let i = 0; i < items; i++) {
            const label = this.getShortDate(new Date(time), true);
            // adding new data item
            data.push({"time": time, "label": label, "open": o, "high": h, "low": l, "close": c, "volume": v});
            // generating new values
            const mod = Math.random() - 0.45;
            o = Math.round((c + (mod * 0.0001)) * 10000) / 10000;
            v = Math.round(v + (mod * 5 * 100));
            h = Math.round((o + (Math.random() * 0.001)) * 10000) / 10000;
            l = Math.round((o - (Math.random() * 0.001)) * 10000) / 10000;
            c = Math.round((l + (Math.random() * (h - l))) * 10000) / 10000;
            time += rangeMins * 60 * 1000;
        }
        return data;
    }

    public static getShortDate(dt: Date, showYear: boolean): string {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const ind = dt.getMonth();
        const day = dt.getDay() + 1;
        let label = months[ind] + " " + day;
        if (showYear) {
            label += ", " +  dt.getFullYear();
        }
        return label;
    }
}

/*
This class aggregates 1-min-OHLC data to the needed level of details.
*/
export class ReduceFinancialData {
    public static chunkIntoN = (arr: FinancialData[], n: number): FinancialData[][] => {
        const size = Math.ceil(arr.length / n);
        return Array.from({ length: n }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );
    }

    public static aggregate(period: FinancialData[]): FinancialData {
        const d = period.reduce((acc: FinancialData, current: FinancialData) => ({
            time: acc.time,
            label: acc.label,
            open: acc.open,
            close: current.close,
            high: current.high>acc.high?current.high:acc.high,
            low: current.low<acc.low?current.low:acc.low,
            volume: acc.volume + current.volume
        }));
        return d;
    };

    public static aggregateData(detailed: FinancialData[], precision: number, graphLength?: number) {
        //const newLength: number = precision; // Because detailled array has values every minute
        const chunks = this.chunkIntoN(detailed, detailed.length/precision);

        const out = chunks.map((el: FinancialData[]): FinancialData => {
            return this.aggregate(el);
        });

        if(graphLength === undefined) graphLength = 120;
        const output: FinancialData[] = out.slice(out.length - graphLength, out.length);

        return output;
    }
}