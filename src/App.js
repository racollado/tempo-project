import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { generateUniqueRandomInt } from './util.js';
import Banner from './Banner.js'
import AudioPlayer from './AudioPlayer.js'
import QuestionBox from './QuestionBox.js'
import OverlayWindow from './OverlayWindow.js'

function App() {

  // **********************************************************************
  // STATE VARIABLES
  // **********************************************************************

  const [emotion, setEmotion] = useState(0);
  const [id1, setId1] = useState(generateUniqueRandomInt(0));
  const [id2, setId2] = useState(generateUniqueRandomInt(id1));
  const [cookies, setCookie] = useCookies([]);
  const [windowOpen, setWindowOpen] = useState(!cookies.accepted);
  const [windowInfo, setWindowInfo] = useState('consent')
  
  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="App">
      <Banner {...{setWindowInfo, setWindowOpen}}/>
      <div id="main-content" className="mt-6 mx-3">
      {windowOpen ? <OverlayWindow {...{windowInfo, setWindowOpen, setCookie}} /> : <></>}
        <div id="players" className="md:flex md:justify-center md:space-x-20">
          <AudioPlayer
            playerId="1"
            songId={id1}
          />
          <AudioPlayer
            playerId="2"
            songId={id2}
          />
        </div>
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
