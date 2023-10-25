import { create } from "zustand";
import { SampleFinancialData } from "~/utils/financialData";
import type { D } from "~/types";

const useChartDataStore = create<{
    data: D[];
    getLastPrice: () => number;
    }>((_set) => {
        const data = SampleFinancialData
            .create(120 * 1440, 1).map(e => ({
                x: new Date(e.time),
                y: [e.open, e.high, e.low, e.close],
            }))
    return {
        data: data,
        getLastPrice: () => data[-1]?.y[3] ?? 0
    }
});

export default useChartDataStore;
