export default function AudioPlayer({songId, playerId}) {
    return (
        <div>
        <h2 className="text-midnight">
            {`Song ${playerId}`}
        </h2>
            <audio id="audio1" controls controlsList="nodownload" 
            src={`https://tempoprojectsongs.s3.amazonaws.com/clips/clip${songId}.mp3`} type="audio/mpeg">
  	    	    Your browser does not support the audio element.
    	    </audio>
        </div>
    );
}