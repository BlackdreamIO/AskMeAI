import { Chat } from "./Chat";

type Chat = {
    id : string
    user : 'client' | 'gpt';
    message : string;
}

interface IConversations {
    conversations : Chat[];
}

export default function Conversations(props : IConversations) 
{
    const { conversations } = props;

    return (
        <figure className="w-full max-w-3xl max-h-[90vh] overflow-y-scroll no-scrollbar">
            <ul className="flex flex-col items-center justify-between space-y-5 m-auto max-w-9/12 w-8/12 mt-10 max-lg:w-11/12">
                {
                    (conversations ?? []).map((chat) => (
                        <Chat user={chat.user} message={chat.message} id={chat.id} key={chat.id} />
                    ))
                }
            </ul>
        </figure>
    )
}
