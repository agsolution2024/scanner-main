'use client';

import * as React from "react"
import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"

export type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ShadcnButton {...props}>{children}</ShadcnButton>
}

export default Button 