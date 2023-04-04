export default function Banner() {
    return (
        <nav class="relative p-6 bg-offblack">
            <div class="flex items-center justify-start">
                    <a href="/">
                        <img class="object-contain h-20" src="https://i.imgur.com/AazTfs4.png" alt="" />
                    </a>
                <div class="hidden md:block flex ml-20 sm:align-middle space-x-20 text-3xl text-white">
                    <a href="/how-to" class="transition-colors hover:text-orange">Instructions</a>
                    <a href="/about" class="transition-colors hover:text-orange">About</a>
                </div>
            </div>
        </nav>
    );
}