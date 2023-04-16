import './AudioPlayer.css';
export default function AudioPlayer({player, songId, bounce}) {

    // **********************************************************************
    // RENDER ELEMENT
    // **********************************************************************

    return (
        <div className={`${bounce ? 'animate-bounce' : ''} sm:flex md:block p-6 rounded font-bold justify-center`}>
            <div className="text-center m-5">
                <div className={`px-6 py-3 min-w-[150px] text-white text-xl bg-offblack rounded border-2 border-black`}>
                    {`Song ${songId}`}
                </div>
        </div>
            <audio id={`audio${-1 * player % 5}`} controls controlsList="nodownload noplaybackrate" className="sm:mt-[22px] md:m-0"
            src={`https://tempoprojectsongs.s3.amazonaws.com/clips/clip${songId}.mp3`} type="audio/mpeg">
  	    	    Your browser does not support the audio element.
    	    </audio>
        </div>
    );
}