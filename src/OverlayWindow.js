export default function OverlayWindow({windowOpen, windowInfo, setWindowOpen, setCookie, accepted, setAccepted}) {
    
    // **********************************************************************
    // WINDOW BUTTON FUNCTIONS
    // **********************************************************************

    const accept = () => {
        setCookie('accepted', true);
        setAccepted(true);
        setWindowOpen(false);
    }

    const close = () => {
        setWindowOpen(false);
    }

    // **********************************************************************
    // RENDERING
    // **********************************************************************

    var innerContent = <></>

    if (windowInfo === 'consent' || windowInfo === 'instructions') {
        innerContent = (
            <>
                <h1 className="font-bold text-3xl">Welcome to TEMPO!</h1>
                <br/>
                <p>
                    You will listen to two 30-second song clips. Then, you will be asked to choose which of the two songs conveys a given emotion most closely. 
                </p>
                <br/>
                <p>
                    The three emotions you will be asked to compare the songs on are:
                </p> 
                <p> 
                    happiness, anger, and chillness. 
                </p>
                <br/>
                <p>
                    After you answer for each of the three emotions, one song will stay the same, and the other will shuffle to a new song. TEMPO continuously generates song matchups, which means you may stop whenever you like.
                </p>
                <br/>
                <p>
                    We recommend that you listen to all audio clips in full at least once, use headphones, and access this site through Chrome on a laptop.
                </p>
                <br/>
                <p>
                    For more detailed information, please reference the <a className="text-blue-500 underline" href="https://drive.google.com/file/d/1ig6VoDWIZl-_Zzw1b-Zc0regJkje4sLp/view?usp=sharing" target="_blank" rel="noopener noreferrer">Informed Consent</a> guide.
                </p>
                <br/>
                <button onClick={windowInfo === 'consent' ? accept : close} className="bg-orange w-48 m-3 px-6 py-3 rounded text-offblack text-xl font-bold border-black border-2 transition-colors hover:bg-[#ffb85b]">
                    {windowInfo === 'consent' ? 'Accept' : 'Close'}
                </button>
            </>
        );
    }

    if (windowInfo === 'about') {
        innerContent = (
            <>
                <h1 className="font-bold text-3xl">About TEMPO</h1>
                <br/>
                <p>
                    TEMPO stands for The Electronic Music Perception Organizer. The goal of this project is to produce a collection of crowd-sourced data reflecting the emotional perception of various electronic music pieces. This data will be turned into an interactive data sonification that will live on this website. Stay tuned!
                </p>
                <br/>
                <p>
                    This is a project developed by Rafael Collado '24 for the independent work seminar "Digital Humanities", under the advising of Professor Brian Kernighan of the Princeton COS department.
                </p> 
                <br/>
                <p>
                    If you have any questions or comments, you can reach Rafael through email: collado@princeton.edu
                </p>
                <br/>
                <button onClick={close} className="bg-orange w-48 m-3 px-6 py-3 rounded text-offblack text-xl font-bold border-black border-2 transition-colors hover:bg-[#ffb85b]">
                    {`Close`}
                </button>
            </>
        );
    }

    return ( 
        <div className={`${windowOpen ? 'opacity-100' : 'invisible opacity-0'} max-w-[calc(100%-1.5rem)] max-h-[79vh] mb-11 left-0 right-0 m-auto absolute bg-[#ffe0b7] border-8 border-black rounded z-10 overflow-y-scroll text-center p-6 text-2xl min-h-[55vh] transition-all`}>
            {innerContent}
        </div> 
    );
}