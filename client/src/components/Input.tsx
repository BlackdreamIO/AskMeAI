import cn from "../utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    varient? : 'UNDERLINE' | 'FILLED' | 'GHOST';
}

export const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
    const { varient, className, ...rest } = props;

    const getVarient = () => {
        switch (varient) {
            case 'FILLED':
                return ''
            case 'FILLED':
                return ''
            case 'UNDERLINE':
                return 'p-2 w-full rounded-md bg-transparent border-b-2 border-black text-black !outline-none placeholder:text-neutral-500 h-12 px-4'

            default:
                return '';
        }
    }

    return (
        <input 
            ref={ref}
            className={cn(getVarient(), className)}
            {...rest} 
        />
    )
})