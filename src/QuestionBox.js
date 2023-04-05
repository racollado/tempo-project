import { updateWins, updateSkips } from './dynamodb.js';
import { generateUniqueRandomInt, sleep } from './util.js';

export default function QuestionBox({emotion, setEmotion, id1, id2, setId1, setId2, setBounce, player, setPlayer}) {
    
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
        await updateQuestion();
    }

    async function song2win() {
        await updateWins(id1, emotions[emotion], 0);
        await updateWins(id2, emotions[emotion], 1);
        await updateQuestion();
    }

    async function skip() {
        await updateSkips(id1, id2, emotions[emotion]);
        await updateQuestion();
    }

    // **********************************************************************
    // QUESTION CYCLER
    // **********************************************************************

    async function updateQuestion() {
        setEmotion((emotion + 1) % emotions.length)
        if (emotion === emotions.length - 1) {
            const temp = id1;
            setId1(id2);
            setId2(generateUniqueRandomInt(temp))
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
        </div>
    );
}