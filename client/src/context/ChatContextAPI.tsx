import { createContext, useState, useEffect, useRef, ReactNode, useContext } from 'react';
import { SoundEffects } from '../utils/soundsLib';


type Chat = {
    id: string;
    user: 'client' | 'gpt';
    message: string;
};

type ChatContextType = {
    conversations: Chat[];
    disableUserPrompt: boolean;
    handleNewPrompt: (prompt: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const GetPreviousChat = () => {
    if (localStorage.getItem('chats')) {
        const localChats: Chat[] = JSON.parse(localStorage.getItem('chats') || '');
        return localChats;
    } else {
        return [];
    }
};

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [conversations, setConversations] = useState<Chat[]>(GetPreviousChat());
    const [disableUserPrompt, setDisableUserPrompt] = useState(false);

    const [currentUUID, setCurrentUUID] = useState('');
    const [gptChat, setGptChat] = useState('');

    const audioRef = useRef<HTMLAudioElement>(null);
    
    const PlaySound = async (src? : string) => {
        try {    
            if(src?.length) {
                audioRef.current?.setAttribute('src', src);
                await audioRef.current?.play();
            }
            else {
                audioRef.current?.setAttribute('src', SoundEffects.Submit2Sound);
                audioRef.current?.play();
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };
    
    // const StopSound = () => {
    //     if (audioRef.current) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;
    //     }
    // };

    const handleNewPrompt = async (prompt: string) => {
        const newUSERUUID = window.crypto.randomUUID();
        const newConversation: Chat = {
            id: newUSERUUID,
            user: 'client',
            message: prompt
        };
        setDisableUserPrompt(true);

        const newGPTUUID = window.crypto.randomUUID();
        const newGPTConversation: Chat = {
            id: newGPTUUID,
            user: 'gpt',
            message: 'Generating...'
        };

        setConversations(prev => [...prev, newConversation, newGPTConversation]);
        setCurrentUUID(newGPTUUID);
        GetStreamingChat({ prompt });
        PlaySound(SoundEffects.Submit2Sound);
    };

    const GetStreamingChat = async ({ prompt }: { prompt: string }) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gem/${encodeURIComponent(prompt)}`, {
                headers : {
                    'Access-Control-Allow-Origin': import.meta.env.VITE_BACKEND_URL
                }
            })
                .then((response : any) => {
                    PlaySound(SoundEffects.TypinhSound);
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let text = '';

                    reader.read().then(function processText({ done, value } : { done : any, value : any }) {
                        if (done) {
                            PlaySound(SoundEffects.ResponseSound);
                            setDisableUserPrompt(false);
                            return;
                        }

                        text += decoder.decode(value, { stream: true });
                        setGptChat(text);

                        return reader.read().then(processText);
                    });
                })
                .catch(error => {
                    console.error('Error fetching stream:', error);
                    setDisableUserPrompt(false);
                });
        } catch (error) {
            const foundChat = conversations.find((chat) => chat.id === currentUUID);
            console.log(foundChat);
        }
    };

    useEffect(() => {
        if (gptChat.length > 0) {
            setConversations(prev => prev.map(chat => chat.id === currentUUID ? { ...chat, message: gptChat } : chat));
        }

        const currentTimoutID = setTimeout(() => {
            if(gptChat.length > 1) {
                //StopSound();
                console.log('Audio Stopped');
            }
        }, 1000);

        return () => clearTimeout(currentTimoutID);
    }, [gptChat, currentUUID]);

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(conversations));
    }, [conversations]);

    return (
        <ChatContext.Provider value={{ conversations, disableUserPrompt, handleNewPrompt }}>
            {children}
            <audio ref={audioRef} src="/error.wav" />
        </ChatContext.Provider>
    );
};

const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export { ChatContextProvider, useChat };
