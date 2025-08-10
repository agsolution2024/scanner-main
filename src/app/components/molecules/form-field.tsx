'use client'

import { Input } from "../atoms/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  id: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
}

export const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
  className,
  ...props
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className={className}
        {...props}
      />
    </div>
  )
}

export default FormField 