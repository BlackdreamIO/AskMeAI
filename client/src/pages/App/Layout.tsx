import { useState, useEffect } from "react";

//import { SuggestedPrompts } from "./Header/SuggestedPrompts";
import { UserPrompt } from "./Prompt/Prompt";
import Conversations from "./Conversations/Conversations";

type Chat = {
    id : string
    user : 'client' | 'gpt';
    message : string;
}

function GetPrevoiusChat () {
    if(localStorage.getItem('chats')) {
        const localChats : Chat[] =  JSON.parse(localStorage.getItem('chats') || '');
        return localChats;
    }
    else {
        const noChat : Chat[] = []
        return noChat;
    }
}

export default function Layout() 
{
    const [conversations, setConversations] = useState<Chat[]>(GetPrevoiusChat());
    const [disableUserPromt, setDisableUserPromt] = useState(false);

    const [currentUUID, setCurrentUUID] = useState('');
    const [gptChat, setGptChat] = useState('');

    const handleNewPromt = async (promt : string) => {
        const newConversation : Chat = {
            id : window.crypto.randomUUID(),
            user : 'client',
            message : promt
        }
        setDisableUserPromt(true);
        setConversations(prev => [...prev, newConversation]);
        //speak(promt);
        //GetStreamingChat();
        const newGPTUUID = window.crypto.randomUUID();
        const newGPTConversation : Chat = {
            id : newGPTUUID,
            user : 'gpt',
            message : '...'
        }
        setConversations(prev => [...prev, newGPTConversation]);
        setCurrentUUID(newGPTUUID);
        GetStreamingChat({ prompt : promt });
    }

    useEffect(() => {
        if (gptChat.length > 0) {
            setConversations((prev) => {
                const exist = prev.find(chat => chat.id === currentUUID);
                if (exist) {
                    return prev.map(chat => chat.id === currentUUID ? { ...chat, message: gptChat } : chat);
                } else {
                    //const newChat = { id: currentUUID, user: 'gpt', message: gptChat };
                    return [...prev];
                }
            });
            setDisableUserPromt(false);
        }
    }, [gptChat, currentUUID]);

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(conversations));
    }, [conversations])
    

    async function GetStreamingChat({prompt} : { prompt : string }) 
    {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gem/${encodeURIComponent(prompt)}`)
            .then((response : any) => {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let text = '';

                reader.read().then(function processText({ done, value } : { done : any, value : any }) {
                    if (done) {
                        console.log("Stream complete");
                        return;
                    }

                    text += decoder.decode(value, { stream : true});
                    setGptChat(text);

                    return reader.read().then(processText);
                });
            })
            .catch(error => {
                console.error('Error fetching stream:', error);
        });
    }

    return (
        <div className="w-full bg-[rgb(5,5,5)] min-h-screen relative flex flex-col justify-start items-center">
            {/* <SuggestedPrompts /> */}
            <Conversations conversations={conversations} />
            <UserPrompt disablePromt={disableUserPromt} onSubmit={handleNewPromt} />
        </div>
    )
 }
 