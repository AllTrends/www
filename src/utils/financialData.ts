import type { FinancialData } from '~/types';

export class SampleFinancialData {

    public static create(items?: number, rangeMins?: number): FinancialData[] {
        // initial values
        let v = 10000;
        let o = 0.0492;
        let h = Math.round((o + (Math.random() * 0.001)) * 10000) / 10000;
        let l = Math.round((o - (Math.random() * 0.001)) * 10000) / 10000;
        let c = Math.round((l + (Math.random() * (h - l))) * 10000) / 10000;

        if (items === undefined) {
            items = 120;
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

//this.data = SampleFinancialData.create();
