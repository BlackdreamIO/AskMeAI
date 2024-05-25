import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export type ConversationContextType = {
    soundOnSectionCreate : boolean,
    soundOnLinkCreate : boolean,
    soundOnStartup : boolean,
    inAppNotificatiom : boolean,
    externalNotification : boolean,
}

interface ExtendedIConversationContext {
    audioContext : ConversationContextType;
    setConversationContext : Dispatch<SetStateAction<ConversationContextType>>;
}

const ConversationContext = createContext<Partial<ExtendedIConversationContext | undefined>>({});

export const useConversationContext = () => useContext(ConversationContext);

type ConversationContextProviderProps = {
    children : ReactNode;
}

export const ConversationContextProvider = ({children} : ConversationContextProviderProps) => {

    return (
        <ConversationContext.Provider value={}>
            {children}
        </ConversationContext.Provider>
    )
}