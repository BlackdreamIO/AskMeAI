import { SuggetionPromt } from "./SuggetionPromt"

export const SuggestedPrompts = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center space-y-5">
            <h1 className="text-6xl text-center text-neutral-300 font-bold mb-20">ONE MESSAGE IS READY</h1>

            <ul className="w-11/12 m-auto flex flex-row flex-wrap items-center justify-center gap-3">
                <SuggetionPromt promt="how to use fetch in javascirpt" onClick={() => {}} />
                <SuggetionPromt promt="expereince the souel like local" onClick={() => {}} />
                <SuggetionPromt promt="pick outfit to look good on camera" onClick={() => {}} />
            </ul>
            <ul className="w-11/12 m-auto flex flex-row flex-wrap items-center justify-center gap-3">
                <SuggetionPromt promt="how to use fetch in javascirpt" onClick={() => {}} />
                <SuggetionPromt promt="python scirpt for daily email reports" onClick={() => {}} />
                <SuggetionPromt promt="create a workout plan" onClick={() => {}} />
            </ul>
        </div>
    )
}
