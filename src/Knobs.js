/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { Donut } from "react-dial-knob";
import { generateEmotionValue } from './util.js';
import { distance, generateNormalizedScores } from './db/process.js'

export default function Knobs({setSortedIds, setPlaylistIndex}) {
    
    // **********************************************************************
    // STATE/REF VARIABLES
    // **********************************************************************

    const allScores = useRef([]);
    const [happyValue, setHappyValue] = useState(generateEmotionValue());
    const [angryValue, setAngryValue] = useState(generateEmotionValue());
    const [chillValue, setChillValue] = useState(generateEmotionValue());
    
    // **********************************************************************
    // USE EFFECTS
    // **********************************************************************

    // initial data fetch; get scores and sort list
    useEffect(() => {
        async function effect() {
            const scores = await generateNormalizedScores();
            allScores.current = scores;
            const sorted = scores.sort((scoreSetA, scoreSetB) => {
                const params = [happyValue, angryValue, chillValue]
                return distance(params, scoreSetA) - distance(params, scoreSetB);
            });
            setSortedIds(sorted.map((item) => item[0]));
            setPlaylistIndex(0);
        }
        effect();
    }, [allScores])

    // when the dials change value; re-sort list
    useEffect(() => {
        if (allScores.current.length !== 0) {
            const sorted = allScores.current.sort((scoreSetA, scoreSetB) => {
                const params = [happyValue, angryValue, chillValue]
                return distance(params, scoreSetA) - distance(params, scoreSetB);
            });
            setSortedIds(sorted.map((item) => item[0]));
            setPlaylistIndex(0);
        }
    }, [happyValue, angryValue, chillValue])

    // **********************************************************************
    // RENDERING
    // **********************************************************************

    return (
        <div id="knobs" className="p-0 w-[35rem] flex mx-auto text-white md:p-6 text-center rounded-xl mb-3">
            <div className='mx-1 md:mx-5'>
                <div className='text-xl p-2 mb-3 bg-offblack rounded-xl'>
                    Happy
                </div>
                <Donut
                    diameter={130}
                    min={0}
                    max={100}
                    step={1}
                    value={happyValue}
                    theme={{
                        donutColor: "#22c55e"
                    }}
                    onValueChange={setHappyValue}
                />
            </div>
            <div className='mx-1 md:mx-5'>
                <div className='text-xl p-2 mb-3 bg-offblack rounded-xl'>
                    Angry
                </div>
                <Donut
                    diameter={130}
                    min={0}
                    max={100}
                    step={1}
                    value={angryValue}
                    theme={{
                        donutColor: "#dc2626"
                    }}
                    onValueChange={setAngryValue}
                />
            </div>
            <div className='mx-1 md:mx-5'>
                <div className='text-xl p-2 mb-3 bg-offblack rounded-xl'>
                    Chill
                </div>
                <Donut
                    diameter={130}
                    min={0}
                    max={100}
                    step={1}
                    value={chillValue}
                    theme={{
                        donutColor: "#3b82f6"
                    }}
                    onValueChange={setChillValue}
                />
            </div>
        </div>
    );
}