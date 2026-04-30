import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-bg-light transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-accent",
    {
        variants: {
            variant: {
                default: "bg-primary text-text-light hover:bg-primary/90 shadow-sm",
                destructive:
                    "bg-error text-text-light hover:bg-error/90 shadow-sm",
                outline:
                    "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-text-light",
                secondary:
                    "bg-secondary text-primary hover:bg-secondary/80",
                ghost: "hover:bg-primary/10 hover:text-primary",
                link: "text-primary underline-offset-4 hover:underline",
                accent: "bg-accent text-primary font-bold hover:bg-accent/90 shadow-sm",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-md px-4",
                lg: "h-14 rounded-xl px-10 text-lg",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
