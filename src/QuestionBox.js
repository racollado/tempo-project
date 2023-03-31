import { updateScores } from './dynamodb.js';
import { generateUniqueRandomInt } from './util.js';
import './styles/QuestionBox.css';

export default function QuestionBox({emotion, setEmotion, id1, id2, setId1, setId2}) {
    
    // **********************************************************************
    // CONSTANTS
    // **********************************************************************

    const emotions = ['happy', 'angry', 'chill'];

    // **********************************************************************
    // OUTCOME FUNCTIONS
    // **********************************************************************
    
    async function song1win() {
        await updateScores(id1, emotions[emotion], true);
        await updateScores(id2, emotions[emotion], false);
        updateQuestion();
    }

    async function song2win() {
        await updateScores(id1, emotions[emotion], false);
        await updateScores(id2, emotions[emotion], true);
        updateQuestion();
    }

    async function neither() {
        await updateScores(id1, emotions[emotion], false);
        await updateScores(id2, emotions[emotion], false);
        updateQuestion();
    }

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
        <div id="question-box">
            <h2>{`Which song is more ${emotions[emotion]}?`}</h2>
            <button onClick={song1win}>{`Song 1 (${id1})`}</button>
            <button onClick={neither}>Neither/Equal</button>
	        <button onClick={song2win}>{`Song 2 (${id2})`}</button>
        </div>
    );
}