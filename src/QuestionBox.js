import { updateWins, updateSkips } from './db/update.js';
import { generateUniqueRandomInt, sleep } from './util.js';

export default function QuestionBox({emotion, setEmotion, id1, id2, setId1, setId2, setBounce, player, setPlayer, accepted, setWindowInfo, windowOpen, setWindowOpen, windowRef, setScrollPosition, numUserResponses, setNumUserResponses, setCookie}) {
    
    // **********************************************************************
    // CONSTANTS
    // **********************************************************************

    const emotions = ['happy', 'angry', 'chill'];
    const emotionColors = ['text-green-500', 'text-red-600', 'text-blue-500'];
    const buttonColors = [
        'bg-orange hover:bg-[#ffb85b] text-offblack', 
        'bg-blue-700 hover:bg-blue-500 text-white', 
        'bg-lime-600 hover:bg-lime-400 text-white', 
        'bg-red-600 hover:bg-red-400 text-white', 
        'bg-purple-600 hover:bg-purple-400 text-white']

    // **********************************************************************
    // OUTCOME FUNCTIONS
    // **********************************************************************
    
    async function song1win() {
        await updateWins(id1, emotions[emotion], 1);
        await updateWins(id2, emotions[emotion], 0);
        await updateQuestion(false);
    }

    async function song2win() {
        await updateWins(id1, emotions[emotion], 0);
        await updateWins(id2, emotions[emotion], 1);
        await updateQuestion(false);
    }

    async function skip() {
        await updateSkips(id1, id2, emotions[emotion]);
        await updateQuestion(true);
    }

    // **********************************************************************
    // QUESTION CYCLER
    // **********************************************************************

    async function updateQuestion(skipped) {
        if (!skipped) {
            setNumUserResponses(numUserResponses + 1);
            setCookie('numUserResponses', numUserResponses + 1)
        }
        setEmotion((emotion + 1) % emotions.length)
        if (emotion === emotions.length - 1) {
            const temp = id1;
            setId1(id2);
            setId2(generateUniqueRandomInt(temp, id2))
            setPlayer(player - 1)
            setBounce(true)
            await sleep(500)
            setBounce(false)
        }
    }

    // **********************************************************************
    // RENDER ELEMENT
    // **********************************************************************

    return (
        <div id="question-box" className="md:w-[35rem] mx-auto bg-offblack text-white p-6 text-center rounded-xl mb-3">
            <p className="text-4xl">
                Which song is more <span className={`transition-colors duration-700 font-bold ${emotionColors[emotion]}`}>
                    {`${emotions[emotion]}?`}
                </span>
            </p>
            <br/>
            <button className={`w-48 m-3 px-6 py-5 rounded text-2xl font-bold border-black border-2 transition-colors ${buttonColors[-1 * player % 5]}`} onClick={song1win}>
                {`Song ${id1}`}
            </button>
            <br/>
	        <button className={`w-48 m-3 px-6 py-5 rounded text-2xl font-bold border-black border-2 transition-colors ${buttonColors[-1 * (player - 1) % 5]}`} onClick={song2win}> 
                {`Song ${id2}`}
            </button>
            <br/>
            <button className="bg-white w-20 m-3 p-1 rounded text-[#4f4f4f] text-xl border-black border-2 transition-colors hover:bg-gray-300 font-light" onClick={skip}>
                Skip
            </button>
            <br/>
            <button onClick={() => {   
                    if (accepted && !windowOpen) {
                        setWindowInfo('instructions'); 
                        setWindowOpen(true);
                        setScrollPosition(windowRef);
                    }}
                } className="transition-colors hover:text-orange">
                    <span>
                        Help ⓘ
                    </span>
            </button>
        </div>
    );
}