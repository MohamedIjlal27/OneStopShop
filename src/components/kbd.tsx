import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "select-none rounded border px-1.5 py-px font-mono text-[0.7rem] font-normal shadow-sm disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        outline: "bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface KbdProps
  extends React.ComponentPropsWithoutRef<"kbd">,
    VariantProps<typeof kbdVariants> {
  abbrTitle?: string
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ abbrTitle, className, variant, ...props }, ref) => {
    const [key, setKey] = React.useState("Ctrl") // Default value for server rendering

    React.useEffect(() => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
      setKey(isMac ? "⌘" : "Ctrl")
    }, [])

    return (
      <kbd
        className={cn(kbdVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {abbrTitle ? (
          <abbr title={abbrTitle} className="no-underline">
            {key}
          </abbr>
        ) : (
          key
        )}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"

export { Kbd }
