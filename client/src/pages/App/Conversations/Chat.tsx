import { useState } from "react"
import { Bot, CircleUser, Clipboard, Download, RefreshCcwDot, Volume1 } from "lucide-react"

//import { AnimatePresence, motion } from "framer-motion";
import CustomMarkdown from "./CustomMarkdown";

type ChatProps = {
    id : string;
    user : 'gpt' | 'client';
    message : string;
}

export const Chat = (props : ChatProps) => {
    const { id, message, user } = props;

    // const [showFullMessage, setShowFullMessage] = useState(false);

    // // Split the message into individual characters
    // const characters = message.split("");

    // useEffect(() => {
    //     // Set a timeout to display the full message after the animations
    //     const totalAnimationTime = characters.length * 0.05 * 1000; // Adjust the timing as needed
    //     const timeout = setTimeout(() => {
    //         setShowFullMessage(true);
    //     }, totalAnimationTime);

    //     // Clear timeout on component unmount
    //     return () => clearTimeout(timeout);
    // }, [message, characters.length]);


    const [selectedText, setSelectedText] = useState('');
    
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

    function SpeechSynthesis(text : string) {
        // Create a SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance(text);
      
        // Select a voice
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[3]; // Choose a specific voice
      
        // Speak the text
        speechSynthesis.speak(utterance);
        //speechSynthesis.
    }

    return (
        <section key={id} className={`w-full selection:text-black selection:font-bold selection:bg-neutral-200 selection:rounded-lg`} onMouseUp={handleMouseUp}>
            {
                user == 'gpt' ? (
                    <div className="space-y-4">
                        <Bot size={'2rem'} />
                        <div className="w-full bg-neutral-900 p-4 flex justify-start items-center rounded-lg border border-neutral-800">
                        {/* {!showFullMessage ? (
                characters.map((char, index) => (
                    <motion.span
                        key={index}
                        className="character"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }} // Adjust delay as needed
                    >
                        {char}
                    </motion.span>
                ))
            ) : (
                <motion.h1
                    className="font-medium text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {message}
                </motion.h1>
            )} */}
                        {/* <h1 className="font-medium text-lg">{message}</h1> */}
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
                            <button onClick={handleSpeakLoud} className="text-neutral-500 hover:text-green-400">
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
