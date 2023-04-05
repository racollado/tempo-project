export default function Banner({setWindowInfo, setWindowOpen}) {
    return (
        <nav className="relative w-[100%] p-6 bg-offblack">
            <div className="flex items-center justify-start">
                    <a href="/">
                        <img className="object-contain h-20" src="https://i.imgur.com/AazTfs4.png" alt="" />
                    </a>
                <div className="hidden md:flex ml-20 sm:align-middle space-x-20 text-3xl text-white">
                    <button onClick={() => {setWindowInfo('instructions'); setWindowOpen(true);}} className="transition-colors hover:text-orange">Instructions</button>
                    <button onClick={() => {setWindowInfo('about'); setWindowOpen(true);}} className="transition-colors hover:text-orange">About</button>
                </div>
            </div>
        </nav>
    );
}