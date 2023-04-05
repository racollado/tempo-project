import { updateScores } from './dynamodb.js';
import { generateUniqueRandomInt, sleep } from './util.js';

export default function QuestionBox({emotion, setEmotion, id1, id2, setId1, setId2, setBounce}) {
    
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
        await updateQuestion();
    }

    async function song2win() {
        await updateScores(id1, emotions[emotion], 0);
        await updateScores(id2, emotions[emotion], 1);
        await updateQuestion();
    }

    async function neither() {
        await updateScores(id1, emotions[emotion], 0);
        await updateScores(id2, emotions[emotion], 0);
        await updateQuestion();
    }

    async function equal() {
        await updateScores(id1, emotions[emotion], 0.5);
        await updateScores(id2, emotions[emotion], 0.5);
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
            setBounce('animate-bounce')
            await sleep(500)
            setBounce('')
        }
    }

    // **********************************************************************
    // RENDER ELEMENT
    // **********************************************************************

    return (
        <div id="question-box" className="md:w-[35rem] mx-auto bg-offblack text-white p-6 text-center rounded-xl mb-3">
            <p className="text-4xl">
                Which song is more <span className={`transition-colors duration-700 font-bold ${colors[emotion]}`}>
                    {`${emotions[emotion]}?`}
                </span>
            </p>
            <br/>
            <button className="bg-orange w-48 m-3 px-6 py-3 rounded text-offblack text-xl font-bold border-black border-2 transition-colors hover:bg-[#ffb85b]" onClick={song1win}>
                {`Song ${id1}`}
            </button>
            <br/>
            <button className="bg-white w-32 m-3 px-6 py-3 rounded text-offblack text-xl border-black border-2 transition-colors hover:bg-gray-300" onClick={neither}>
                Neither
            </button>
            <button className="bg-white w-32 m-3 px-6 py-3 rounded text-offblack text-xl border-black border-2 transition-colors hover:bg-gray-300" onClick={equal}>
                Equal
            </button>
            <br/>
	        <button className="bg-blue-700 w-48 m-3 px-6 py-3 rounded text-xl border-black border-2 font-bold transition-colors hover:bg-blue-500" onClick={song2win}> 
                {`Song ${id2}`}
            </button>
        </div>
    );
}