'use client'

import { Switch as ShadcnSwitch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SwitchProps {
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  id?: string
}

export const Switch = ({ 
  label, 
  checked, 
  defaultChecked,
  disabled,
  onCheckedChange, 
  id 
}: SwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <ShadcnSwitch
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  )
}

export default Switch 