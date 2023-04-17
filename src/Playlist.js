/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { getData } from "./db/get.js";
import { itemCount } from "./util.js";
import { getTotalResponses } from "./db/process.js";

export default function Playlist({sortedIds, playlistIndex, setPlaylistIndex}) {
    
    // **********************************************************************
    // STATE VARIABLES
    // **********************************************************************

    const [songData, setSongData] = useState([]);
    const totalResponses = useRef('...');

    // **********************************************************************
    // USE EFFECT
    // **********************************************************************

    // initial data fetch or when knobs change; get the first song of the sorted list
    useEffect(() => {
        async function effect() {
            const id = sortedIds[playlistIndex];
            if (id !== undefined) {
                setSongData([await getData(sortedIds[0])]);
            }
            totalResponses.current = await getTotalResponses();
        }
        effect();
    }, [sortedIds])

    // **********************************************************************
    // HANDLER FUNCTIONS
    // **********************************************************************

    async function handleForward() {
        if (playlistIndex !== itemCount - 1) {
            const newIdx = (playlistIndex + 1) % itemCount;
            if (songData[newIdx] === undefined) {
                const data = await getData(sortedIds[newIdx]);
                let songDataCopy = [...songData];
                songDataCopy[newIdx] = data;
                setSongData(songDataCopy);
            }
            setPlaylistIndex(newIdx);
        }
    }

    function handleBackward() {
        if (playlistIndex !== 0) {
            const newIdx = playlistIndex - 1;
            setPlaylistIndex(newIdx);
        }
    }

    // **********************************************************************
    // RENDER
    // **********************************************************************

    if (songData[playlistIndex] !== undefined) {
        
        var song = songData[playlistIndex];
    
        return (
            <div>
                <div id="now-playing" className="w-[22rem] md:w-[28rem] mx-auto bg-offblack text-white p-6 text-center rounded-xl mb-3">
                    <p className="font-bold text-2xl">Now Playing</p>
                    <p className="text-lg">{`Based on ${totalResponses.current} responses and counting...`}</p>
                </div>
                <div id="song-info" className="max-w-[35rem] mx-auto bg-offblack text-white p-6 pr-4 text-center rounded-xl mb-3">
                    <div className="flex">
                        <img className="h-32 w-32 md:h-64 md:w-64 mr-2 my-auto" 
                            src={`https://tempoprojectsongs.s3.amazonaws.com/covers/cover${song['id']}.jpg`}  
                            alt="album cover"/>
                        <div id="song-info" className="shadow-bottomblur text-center p-4 pt-2 pr-0 w-auto max-h-64 overflow-y-scroll">
                            <p className="text-lg font-bold">{`${song['title']} by ${song['artist']}`}</p>
                            <br/>
                            <p>{`Album: ${song['album']} (${song['date']})`}</p>
                            <br/>
                            <p>{`From: ${song['location']}`}</p>
                            <br/>
                            <p>{`Categories: ${song['tagged_as'].toString().replaceAll(",", ", ")}`}</p>
                        </div>
                    </div>
                    <div className="flex mt-5 mx-auto">
                        <button 
                            className={`${playlistIndex === 0 ? 'invisible' : ''}`} 
                            onClick={handleBackward}>
                            <IoPlaySkipBack className="w-[30px] h-12 mx-2"/>
                        </button>
                        <audio 
                            id="audio-playlist" 
                            className="sm:mt-[6px] md:m-0 mx-auto"
                            src={`https://tempoprojectsongs.s3.amazonaws.com/songs/song${song['id']}.mp3`}  
                            controls autoPlay controlsList="nodownload noplaybackrate" 
                            type="audio/mpeg"
                            onEnded={handleForward}
                        />
                        <button 
                            className={`${playlistIndex === itemCount - 1 ? 'invisible' : ''}`} 
                            onClick={handleForward}>
                            <IoPlaySkipForward className="w-[30px] h-12 mx-2"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    } 
}