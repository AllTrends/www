import React, { useState } from "react";
import type Pair from "~/interfaces/Pair";


interface PairHeaderProps {
    pair:Pair
}

const PairHeader = (props:PairHeaderProps) => {
    const [showPairs, setShowPairs] = useState(false);

    function togglePairs() {
        setShowPairs(prevShowPairs => !prevShowPairs);
        console.log(showPairs);
    }

    return (
        <div className="container mx-auto p-5 w-full flex space-x-4 text-white">
            <div className="static">
                <button className="font-bold shadow hover:shadow-xl static flex"
                        onClick={togglePairs}>
                    <div className="h-full text-xl">{props.pair.name}</div> 
                    <div className="h-full align-bottom mt-2 mb-0 pl-3">&#65088;</div>
                </button>

                <div className={"absolute bottom-0 left-0 " + showPairs?"":"collapse"}>
                    This is the list of pairs.
                </div>
            </div>
            <div>
                Price
            </div>
            <div>
                24h Change
            </div>
            <div>
                24h High
            </div>
            <div>
                24h Low
            </div>
        </div>
    );
};

export default PairHeader;
