//import { SuggestedPrompts } from "./Header/SuggestedPrompts";
import { UserPrompt } from "./Prompt/Prompt";
import Conversations from "./Conversations/Conversations";

import { useChat } from "../../context/ChatContextAPI";

export default function Layout() 
{
    const { conversations, disableUserPrompt, handleNewPrompt } = useChat();

    return (
        <div className="w-full bg-[rgb(5,5,5)] min-h-screen relative flex flex-col justify-start items-center">
            {/* <SuggestedPrompts /> */}
            <Conversations conversations={conversations} />
            <UserPrompt disablePromt={disableUserPrompt} onSubmit={handleNewPrompt} />
        </div>
    )
 }
 