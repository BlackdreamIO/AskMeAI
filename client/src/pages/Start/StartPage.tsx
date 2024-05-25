import { Power } from "lucide-react";

export default function StartPage({ onStart } : { onStart : () => void }) 
{
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-10">
            <h1 className="text-center font-medium text-neutral-200 text-9xl max-xl:text-7xl max-sm:!text-4xl">ONCE MESSAGE</h1>
            <h1 className="text-center font-medium text-neutral-400 text-xs sm:text-sm xl:text-xl 2xl:text-3xl 3xl:text-3xl">BY BLACKDREAM {'(Mohammed Hamim)'}</h1>
            <button onClick={onStart} className="text-4xl text-neutral-500 hover:text-white">
                <Power />
            </button>
        </div>
    )
}
