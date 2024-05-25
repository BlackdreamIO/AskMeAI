
type SuggetionPromtProps = {
    promt : string;
    onClick : (prom : string) => void;
}

export const SuggetionPromt = (props : SuggetionPromtProps) => {
    
    const handleClick = () => {
        props.onClick(props.promt);
    }
    
    return (
        <button onClick={() => handleClick()} className="w-96 py-5 pb-6 px-6 rounded-xl border border-neutral-700 cursor-pointer hover:bg-neutral-900">
            <h2 className="font-medium text-center">{props.promt}</h2>
        </button>
    )
}
