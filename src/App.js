import { useState } from 'react';
import { generateUniqueRandomInt } from './util.js';
import Banner from './Banner.js'
import AudioPlayer from './AudioPlayer.js'
import QuestionBox from './QuestionBox.js'
import './styles/App.css';

function App() {

  // **********************************************************************
  // STATE VARIABLES
  // **********************************************************************

  const [emotion, setEmotion] = useState(0)
  const [id1, setId1] = useState(generateUniqueRandomInt(0))
  const [id2, setId2] = useState(generateUniqueRandomInt(id1))

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="App">
      <Banner/>
      <div id="main-content">
        <AudioPlayer
          playerId="1"
          songId={id1}
        />
        <AudioPlayer
          playerId="2"
          songId={id2}
        />
        <QuestionBox
          {...{
            emotion,
            setEmotion,
            id1,
            id2,
            setId1,
            setId2,
          }}
          />
      </div>
    </div>
  );
}

export default App;
