import { updateScores } from './dynamodb.js';
import { generateUniqueRandomInt } from './util.js';

export default function QuestionBox({emotion, setEmotion, id1, id2, setId1, setId2}) {
    
    // **********************************************************************
    // CONSTANTS
    // **********************************************************************

    const emotions = ['happy', 'angry', 'chill'];
    const colors = ['text-green-500', 'text-red-600', 'text-blue-500'];

    // **********************************************************************
    // OUTCOME FUNCTIONS
    // **********************************************************************
    
    async function song1win() {
        await updateScores(id1, emotions[emotion], 1);
        await updateScores(id2, emotions[emotion], 0);
        updateQuestion();
    }

    async function song2win() {
        await updateScores(id1, emotions[emotion], 0);
        await updateScores(id2, emotions[emotion], 1);
        updateQuestion();
    }

    async function neither() {
        await updateScores(id1, emotions[emotion], 0);
        await updateScores(id2, emotions[emotion], 0);
        updateQuestion();
    }

    async function equal() {
        await updateScores(id1, emotions[emotion], 0.5);
        await updateScores(id2, emotions[emotion], 0.5);
        updateQuestion();
    }

    // **********************************************************************
    // QUESTION CYCLER
    // **********************************************************************

    function updateQuestion() {
        if (emotion === emotions.length - 1) {
            const temp = id1;
            setId1(id2);
            setId2(generateUniqueRandomInt(temp))
        }
        setEmotion((emotion + 1) % emotions.length)
    }

    // **********************************************************************
    // RENDER ELEMENT
    // **********************************************************************

    return (
        <div id="question-box" class="w-[35rem] mx-auto bg-offblack text-white p-6 text-center rounded-xl">
            <p class="text-4xl">
                Which song is more <span className={`font-bold ${colors[emotion]}`}>
                    {`${emotions[emotion]}?`}
                </span>
            </p>
            <br/>
            <button class="bg-orange w-48 m-3 px-6 py-3 rounded text-offblack text-xl font-bold border-black border-2 transition-colors hover:bg-[#ffb85b]" onClick={song1win}>
                {`Song ${id1}`}
            </button>
            <br/>
            <button class="bg-white w-32 m-3 px-6 py-3 rounded text-offblack text-xl border-black border-2 transition-colors hover:bg-gray-300" onClick={neither}>
                Neither
            </button>
            <button class="bg-white w-32 m-3 px-6 py-3 rounded text-offblack text-xl border-black border-2 transition-colors hover:bg-gray-300" onClick={equal}>
                Equal
            </button>
            <br/>
	        <button class="bg-blue-700 w-48 m-3 px-6 py-3 rounded text-xl border-black border-2 font-bold transition-colors hover:bg-blue-500" onClick={song2win}> 
                {`Song ${id2}`}
            </button>
        </div>
    );
}