import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { SampleFinancialData } from "~/utils/financialData";
import type { FinancialData } from "~/types";

const useFinancialDataStore = create<{ data: FinancialData[]; getLastPrice: () => number; }, [["zustand/persist", unknown]]>(
        persist(
            (_set) => {
            const data = SampleFinancialData.create(120 * 1440, 1)
        return {
            data: data,
            getLastPrice: () => data[data.length-1]?.close ?? 0
        }
},
{
    name: 'financial-data',
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used

}));

export default useFinancialDataStore;
