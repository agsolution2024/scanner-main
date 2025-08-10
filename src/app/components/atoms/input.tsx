'use client';

import * as React from "react"
import { Input as ShadcnInput } from "@/components/ui/input"

export type InputProps = React.ComponentProps<"input">

export const Input = (props: InputProps) => {
  return <ShadcnInput {...props} />
}

export default Input 