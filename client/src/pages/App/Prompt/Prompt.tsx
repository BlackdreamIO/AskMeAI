import { useState } from "react";

import { SendHorizontal } from "lucide-react"

type UserPromptProps = {
    disablePromt : boolean;
    onSubmit : (promt : string) => void;
}

export const UserPrompt = (props : UserPromptProps) =>{
    const { disablePromt, onSubmit } = props;

    const [promt, setPromt] = useState('');

    return (
        <div className="w-8/12 m-auto rounded-lg h-16 bg-neutral-900 flex justify-center items-center absolute bottom-5 mx-auto left-0 right-0">
            <input 
                type="text"
                className="h-16 w-11/12 rounded-lg bg-black p-2 px-4 outline-none focus:outline-[mediumspringgreen]"
                value={promt}
                onChange={(e) => setPromt(e.target.value)}
                disabled={disablePromt}
                onKeyDown={(e) => {
                    if(e.key == 'Enter') {
                        onSubmit(promt);
                        setPromt('');
                    }
                }}
            />
            <button disabled={disablePromt} onClick={() => {onSubmit(promt); setPromt('')}} className="flex flex-grow h-14 rounded-lg justify-center items-center p-0 outline-none border-none focus-visible:!outline-blue-500 disabled:outline-red-400">
                <SendHorizontal />
            </button>
        </div>
    )
}
