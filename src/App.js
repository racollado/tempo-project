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
  const [player, setPlayer] = useState(0);
  const [id1, setId1] = useState(generateUniqueRandomInt(0));
  const [id2, setId2] = useState(generateUniqueRandomInt(id1));
  const [cookies, setCookie] = useCookies([]);
  const [accepted, setAccepted] = useState(cookies.accepted);
  const [windowOpen, setWindowOpen] = useState(!cookies.accepted);
  const [windowInfo, setWindowInfo] = useState('consent')
  const [bounce, setBounce] = useState('');
  
  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  return (
    <div className="App">
      <Banner {...{setWindowInfo, setWindowOpen, accepted}}/>
      <div id="main-content" className="mt-6 mx-3">
      <OverlayWindow {...{windowOpen, windowInfo, setWindowOpen, setCookie, accepted, setAccepted}} />
        <div id="players" className="md:flex md:justify-center md:space-x-20">
          <AudioPlayer player={player} songId={id1} bounce={bounce} />
          <AudioPlayer player={player - 1} songId={id2} bounce={bounce} />
        </div>
        <QuestionBox
          {...{emotion, setEmotion, id1, id2, setId1, setId2, setBounce, player, setPlayer}}
          />
        </div>
    </div>
  );
}

export default App;
