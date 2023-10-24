import React, { useState } from "react";
import type { Pair } from "~/types";


interface PairHeaderProps {
    pair: Pair
}

const PairHeader = (props:PairHeaderProps) => {
    const [showPairs, setShowPairs] = useState(false);

    function getPrice(numerator: string, denominator: string) {
        console.log(`Get price for ${numerator}Perp/${denominator} pair.`)
        return 1000;
    }

    function getChange(numerator: string, denominator: string) {
        console.log(`Get 24h Change for ${numerator}Perp/${denominator} pair.`)
        return "+5%";
    }

    function getHigh(numerator: string, denominator: string) {
        console.log(`Get 24h High for ${numerator}Perp/${denominator} pair.`)
        return 1200;
    }

    function getLow(numerator: string, denominator: string) {
        console.log(`Get 24h Low for ${numerator}Perp/${denominator} pair.`)
        return 800;
    }

    function togglePairs() {
        setShowPairs(prevShowPairs => !prevShowPairs);
        console.log(showPairs);
    }

    return (
        <div className="container mx-auto p-5 w-full flex space-x-4 text-white">
            <div className="static">
                <button className="font-bold shadow hover:shadow-xl static flex"
                        onClick={togglePairs}>
                    <div className="h-full text-xl">{props.pair.numerator}Perp/{props.pair.denominator} pair</div> 
                    <div className="h-full align-bottom mt-2 mb-0 pl-3">&#65088;</div>
                </button>

                <div className={"absolute bottom-0 left-0 " + showPairs?"":"collapse"}>
                    This is the list of pairs.
                </div>
            </div>
            <div>
                Price
                {getPrice(props.pair.numerator, props.pair.denominator)}
            </div>
            <div>
                24h Change
                {getChange(props.pair.numerator, props.pair.denominator)}
            </div>
            <div>
                24h High
                {getHigh(props.pair.numerator, props.pair.denominator)}
            </div>
            <div>
                24h Low
                {getLow(props.pair.numerator, props.pair.denominator)}
            </div>
        </div>
    );
};

export default PairHeader;
