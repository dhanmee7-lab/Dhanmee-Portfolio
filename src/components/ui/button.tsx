import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-0.5 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_6px_18px_-2px_rgba(57,255,136,0.4)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "border border-primary bg-card text-primary font-semibold tracking-wide uppercase neon-ring hover:-translate-y-0.5 hover:bg-primary/15 hover:text-primary hover:neon-ring-strong hover:shadow-[0_8px_22px_-4px_rgba(57,255,136,0.45)] transition-all",
        cyber:
          "border border-primary/65 bg-card text-primary font-semibold tracking-wide uppercase neon-ring hover:-translate-y-0.5 hover:bg-primary/15 hover:border-primary hover:neon-ring-strong hover:shadow-[0_8px_22px_-4px_rgba(57,255,136,0.4)] transition-all",
        ghostCyber:
          "border border-border bg-card text-foreground tracking-wide uppercase backdrop-blur hover:-translate-y-0.5 hover:border-alert/75 hover:text-primary hover:shadow-[0_8px_20px_-6px_rgba(255,0,0,0.3)] transition-all",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-7 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
