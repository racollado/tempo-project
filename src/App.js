import { useState, useRef } from 'react';
import { useCookies } from 'react-cookie'
import { generateUniqueRandomInt } from './util.js';
import Banner from './Banner.js'
import AudioPlayer from './AudioPlayer.js'
import QuestionBox from './QuestionBox.js'
import OverlayWindow from './OverlayWindow.js'
import Playlist from './Playlist.js'
import Knobs from './Knobs.js'

function App() {

  // **********************************************************************
  // STATE VARIABLES
  // **********************************************************************

  const [emotion, setEmotion] = useState(0);
  const [player, setPlayer] = useState(0);
  const [id1, setId1] = useState(generateUniqueRandomInt(0, 0));
  const [id2, setId2] = useState(generateUniqueRandomInt(id1, 0));
  const [windowInfo, setWindowInfo] = useState('consent')
  const [bounce, setBounce] = useState('');
  const [page, setPage] = useState('review');
  const [sortedIds, setSortedIds] = useState([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  // **********************************************************************
  // REF (SCROLL TO TOP OF WINDOW WHEN OPENED)
  // **********************************************************************

  const windowRef = useRef(null);

  const setScrollPosition = (ref) => {
      window.scrollTo(0,100)
      ref.current.scrollTo(0,0);
  };

  // **********************************************************************
  // COOKIES
  // **********************************************************************

  const [cookies, setCookie] = useCookies([]);
  const [accepted, setAccepted] = useState(cookies.accepted);
  const [windowOpen, setWindowOpen] = useState(!cookies.accepted);
  const [numUserResponses, setNumUserResponses] = useState(parseInt(cookies.numUserResponses) || 0);
  
  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  let mainContent = 
  <>
    <div id="now-playing" className={`${numUserResponses === 0 ? 'invisible' : ''} max-w-[35rem] mx-auto bg-offblack text-white p-3 text-center text-l font-bold rounded-xl`}>
      {`You've contributed ${numUserResponses} responses.`}
    </div>
    <div id="players" className="md:flex md:justify-center md:space-x-20">
      <AudioPlayer player={player} songId={id1} bounce={bounce} />
      <AudioPlayer player={player - 1} songId={id2} bounce={bounce} />
    </div>
    <QuestionBox {...{emotion, setEmotion, id1, id2, setId1, setId2, setBounce, player, setPlayer, accepted, windowOpen, setWindowOpen, setWindowInfo, windowRef, setScrollPosition, numUserResponses, setNumUserResponses, setCookie}}
    />
  </>

  if (page === 'explore') {
    mainContent = 
    <>
      <Playlist {...{sortedIds, playlistIndex, setPlaylistIndex}} />
      <Knobs {...{setSortedIds, setPlaylistIndex}} />
    </>
  }

  return (
    <div className="App">
      <Banner {...{setWindowInfo, setWindowOpen, accepted, setPage, setScrollPosition,windowRef}}/>
      <div id="main-content" className="mt-6 mx-3">
        <OverlayWindow {...{windowRef, windowOpen, windowInfo, setWindowOpen, setCookie, accepted, setAccepted}} />
        {mainContent}  
      </div>
    </div>
  );
}

export default App;
