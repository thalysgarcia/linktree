import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
    return (
        <input
            className="w-full h-10 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground font-mono text-sm px-3 outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
            {...props}
        />
    )
}
