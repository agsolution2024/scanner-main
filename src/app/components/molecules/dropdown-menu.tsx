'use client'

import { ReactNode } from 'react'
import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Button } from "../atoms/button"
import { cn } from "@/lib/utils"

export interface DropdownMenuItemType {
  label: string
  onClick?: () => void
  icon?: ReactNode
  disabled?: boolean
  variant?: 'default' | 'destructive'
}

export interface DropdownMenuGroupType {
  label: string
  items: DropdownMenuItemType[]
}

export interface DropdownMenuProps {
  trigger?: ReactNode
  triggerText?: string
  triggerVariant?: 'default' | 'secondary' | 'outline' | 'ghost'
  items?: DropdownMenuItemType[]
  groups?: DropdownMenuGroupType[]
  className?: string
  align?: 'start' | 'end' | 'center'
}

export const DropdownMenu = ({
  trigger,
  triggerText = 'Menu',
  triggerVariant = 'outline',
  items = [],
  groups = [],
  className,
  align = 'end',
}: DropdownMenuProps) => {
  const renderItems = (menuItems: DropdownMenuItemType[]) => {
    return menuItems.map((item, index) => (
      <DropdownMenuItem
        key={index}
        onClick={item.onClick}
        disabled={item.disabled}
        variant={item.variant}
        className={cn(
          "flex items-center gap-2",
          item.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {item.icon}
        {item.label}
      </DropdownMenuItem>
    ))
  }

  return (
    <BaseDropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant={triggerVariant}>
            {triggerText}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={className}
        align={align}
        sideOffset={4}
      >
        {/* Render ungrouped items first */}
        {items.length > 0 && renderItems(items)}

        {/* Render groups */}
        {groups.map((group, index) => (
          <div key={index}>
            {/* Add separator before each group except the first one when there are no ungrouped items */}
            {(items.length > 0 || index > 0) && <DropdownMenuSeparator />}
            
            <DropdownMenuGroup>
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
              {renderItems(group.items)}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </BaseDropdownMenu>
  )
} 