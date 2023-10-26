import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { SampleFinancialData } from "~/utils/financialData";
import type { FinancialData } from "~/types";
import { currentXDCPrice } from "~/utils/constants";

/*
Let's generate mock-up data and adjust it to the current XDC/USDT price which is around $0.50.
*/
const useFinancialDataStore = create<{ data: FinancialData[]; getLastPrice: () => number; }, [["zustand/persist", unknown]]>(
        persist(
            (_set) => {
            const data = SampleFinancialData.create(120 * 1440, 1);
            const lastValue = data[data.length-1]?.close ?? 0;
            const lastInventedPrice = Math.round((currentXDCPrice-Math.random()*0.005)*10000)/10000;
            const scaleFactor = lastInventedPrice/lastValue;
            const scaledData = data.map((f) => ({
                time: f.time,
                label: f.label,
                open: Math.round(f.open*scaleFactor*10000)/10000,
                high: Math.round(f.high*scaleFactor*10000)/10000,
                low: Math.round(f.low*scaleFactor*10000)/10000,
                close: Math.round(f.close*scaleFactor*10000)/10000,
                volume: f.volume,
            }));
        return {
            data: scaledData,
            getLastPrice: () => lastInventedPrice
        }
},
{
    name: 'financial-data',
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used

}));

export default useFinancialDataStore;
