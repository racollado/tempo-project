export default function Banner({setWindowInfo, setWindowOpen, accepted, setPage, setScrollPosition, windowRef}) {
    return (
        <nav className="relative w-[100%] p-6 bg-offblack">
            <div className="sm:block md:flex md:items-center md:justify-start">
                    <a href="/">
                        <img className="object-contain h-20" src="https://i.imgur.com/AazTfs4.png" alt="" />
                    </a>
                <div className="mt-5 md:mt-0 md:flex md:ml-20 align-middle space-x-12 text-2xl text-white">
                    <button onClick={() => {   
                            if (accepted) {
                                setPage('review')
                        }}} className="transition-colors hover:text-orange">Review
                    </button>
                    <button onClick={() => {   
                            if (accepted) {
                                setPage('explore')
                        }}} className="transition-colors hover:text-orange">Explore
                    </button>
                    <button onClick={() => {   
                            if (accepted) {
                                setWindowInfo('about'); 
                                setWindowOpen(true);
                                setScrollPosition(windowRef)
                        }}} className="transition-colors hover:text-orange">About
                    </button>
                </div>
            </div>
        </nav>
    );
}