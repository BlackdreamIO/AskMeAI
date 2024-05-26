import { useState } from "react"
import { Bot, CircleUser, Clipboard, Download, RefreshCcwDot, Volume1 } from "lucide-react"
import { marked } from 'marked';

//import { AnimatePresence, motion } from "framer-motion";
import CustomMarkdown from "./CustomMarkdown";

type ChatProps = {
    id : string;
    user : 'gpt' | 'client';
    message : string;
}

export const Chat = (props : ChatProps) => {
    const { id, message, user } = props;

    const [selectedText, setSelectedText] = useState('');
    //const [isSpeaking, setIsSpeaking] = useState(false);
    
    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (selection) {
            const text = selection.toString();
            setSelectedText(text.length > 0 ? text : selectedText);
        }
    };

    const handleSpeakLoud = () => {
        if(user == 'gpt') {
            SpeechSynthesis(message);
        }
    }

    async function SpeechSynthesis(text : string) {
        /*
        // Remove markdown formatting
        const plainText = (await marked.parse(text)).replace(/(<([^>]+)>)/gi, "");
    
        // Create a SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance(plainText);
    
        // Select a voice
        const voices = speechSynthesis.getVoices();
        console.log(voices);
        utterance.voice = voices[3]; // Choose a specific voice
    
        // Speak the text
        setIsSpeaking(!isSpeaking);
        !isSpeaking ? speechSynthesis.cancel() : speechSynthesis.speak(utterance);
        */
        const cleanedText = text.replace(/(\*|`|_|\[|\]|\(|\))/g, ' '); // Remove Markdown syntax
        const plainText = (await marked.parse(cleanedText)).replace(/(<([^>]+)>)/gi, ' ');
        if (window.responsiveVoice) {
            window.responsiveVoice.getVoices();
            window.responsiveVoice.speak(plainText, 'UK English Male');
        } else {
          console.error('ResponsiveVoice library not loaded');
        }
    }

    return (
        <section key={id} className={`w-full selection:text-black selection:font-bold selection:bg-neutral-200 selection:rounded-lg`} onMouseUp={handleMouseUp}>
            {
                user == 'gpt' ? (
                    <div className="space-y-4">
                        <Bot size={'2rem'} />
                        <div className="w-full bg-neutral-900 p-4 flex justify-start items-center rounded-lg border border-neutral-800">
                        <CustomMarkdown content={message} />
                        </div>
                        <ul className="ml-5 flex flex-row space-x-5 w-full">
                            <button className="text-neutral-500 hover:text-green-400">
                                <Download />
                            </button>
                            <button className="text-neutral-500 hover:text-green-400">
                                <Clipboard />
                            </button>
                            <button className="text-neutral-500 hover:text-green-400">
                                <RefreshCcwDot />
                            </button>
                            <button onClick={handleSpeakLoud} className={`text-neutral-500 ${ 1+1 == 4 ? 'text-green-400' : 'hover:text-green-400'}`}>
                                <Volume1 size={'2rem'} />
                            </button>
                        </ul>
                    </div>
                )
                : (
                    <div className="w-full p-4 flex justify-end items-center rounded-lg">
                        <h1 className="font-medium text-lg">{message}</h1>
                        <CircleUser/>
                    </div>
                )
            }
        </section>
    )
}
