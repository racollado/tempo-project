import './AudioPlayer.css';
export default function AudioPlayer({playerId, songId}) {

    // **********************************************************************
    // RENDER ELEMENT
    // **********************************************************************

    return (
        <div class="sm:flex md:block p-6 rounded font-bold justify-center">
            <div class="text-center m-5">
                <span class={`px-12 py-3 text-white text-xl bg-offblack rounded border-2 border-black`}>
                    {`Song ${songId}`}
                </span>
        </div>
            <audio id={`audio${playerId}`} controls controlsList="nodownload noplaybackrate" class="sm:mt-[6px] md:m-0"
            src={`https://tempoprojectsongs.s3.amazonaws.com/clips/clip${songId}.mp3`} type="audio/mpeg">
  	    	    Your browser does not support the audio element.
    	    </audio>
        </div>
    );
}