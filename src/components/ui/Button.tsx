import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-mono uppercase tracking-wider ring-offset-white transition-all duration-200 gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border-2 border-border-color shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none select-none focus:outline-none focus:ring-2 focus:ring-yellow-green focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-pink-400 text-white hover:bg-pink-300 hover:text-white font-pixel",
        noShadow:
          "bg-cayenne text-white shadow-none hover:translate-x-0 hover:translate-y-0",
        neutral:
          "bg-yellow-green text-evergreen hover:bg-cayenne hover:text-white",
        reverse:
          "bg-cayenne text-white hover:translate-x-0.5 hover:translate-y-0.5",
        primary:
          "bg-green-500 text-black hover:bg-green-400 hover:text-evergreen",
        secondary:
          "bg-yellow-green text-black hover:bg-cayenne hover:text-white",
        outline:
          "bg-soft-linen text-black hover:bg-yellow-green hover:text-evergreen",
        danger:
          "bg-cayenne text-white hover:bg-yellow-green hover:text-evergreen",
        ghost:
          "bg-darkteal text-soft-linen hover:bg-yellow-green hover:text-evergreen",
        green:
          "bg-emerald-600 text-white hover:bg-emerald-500 hover:text-white active:bg-emerald-700",
        success:
          "bg-emerald-600 text-white hover:bg-emerald-500 hover:text-white active:bg-emerald-700",
      },
      size: {
        default: "h-12 px-4 py-2 text-xs",
        sm: "h-10 px-3 text-xs",
        md: "h-12 px-4 py-2 text-xs",
        lg: "h-14 px-6 text-sm sm:text-base",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function GreenButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="green"
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

export { Button, GreenButton, buttonVariants }
