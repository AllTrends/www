import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import type { Pair } from "~/types";


interface PairHeaderProps {
    pair: Pair
}

const PairHeader = (props:PairHeaderProps) => {
    const [showPairs, setShowPairs] = useState(false);

    const price = getPrice(props.pair.numerator, props.pair.denominator);
    const change = getChange(props.pair.numerator, props.pair.denominator);
    const high = getHigh(props.pair.numerator, props.pair.denominator);
    const low = getLow(props.pair.numerator, props.pair.denominator);
    let classHidden = "";

    function getPrice(numerator: string, denominator: string) {
        console.log(`Get price for ${numerator}Perp/${denominator} pair.`);
        const _price = 1000; // Call API
        return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD'}).format(_price);
    }

    function getChange(numerator: string, denominator: string) {
        console.log(`Get 24h Change for ${numerator}Perp/${denominator} pair.`);
        const _change = 0.0564; // Call API
        if (_change < 0) {
            return (_change*100).toFixed(2)+"%";
        } else {
            return "+" + (_change*100).toFixed(2)+"%";
        }
    }

    function getHigh(numerator: string, denominator: string) {
        console.log(`Get 24h High for ${numerator}Perp/${denominator} pair.`);
        const _high = 1200; // Call API
        return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD'}).format(_high);
    }

    function getLow(numerator: string, denominator: string) {
        console.log(`Get 24h Low for ${numerator}Perp/${denominator} pair.`);
        const _low = 800; // Call API
        return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD'}).format(_low);
    }

    function togglePairs() {
        setShowPairs(prevShowPairs => !prevShowPairs);
        console.log(showPairs);
        classHidden = showPairs? "" : "hidden";
        console.log(classHidden);
    }

    return (
        <div className="container mx-auto p-5 w-full flex items-center justify-start gap-12 text-white">
            <div className="relative">
                <button className="font-bold shadow hover:shadow-xl flex"
                        onClick={togglePairs}>
                    <div className="h-full text-xl">{props.pair.numerator}Perp/{props.pair.denominator}</div> 
                    <ChevronDown className="ml-2" aria-hidden="true"/>
                </button>
                <div className={`absolute mt-3 pb-20 pt-2 pl-2 flex flex-col bg-black bg-opacity-90 min-w-[160px] rounded-md text-lg ${showPairs ? "" : "hidden"}`}>
                    Other pairs soon to come...
                </div>
            </div>

            <div>
                <div className="font-semibold">Price</div>
                <div>{price}</div>
            </div>
            <div>
                <div className="font-semibold">24h Change</div>
                <div className={change.startsWith("-") ? "text-[#eb4034]" : "text-[#49cc10]"}>{change}</div>
            </div>
            <div>
                <div className="font-semibold">24h High</div>
                <div>{high}</div>
            </div>
            <div>
                <div className="font-semibold">24h Low</div>
                <div>{low}</div>
            </div>
        </div>
    );
};

export default PairHeader;
