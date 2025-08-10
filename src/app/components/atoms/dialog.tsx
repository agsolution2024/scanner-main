import {
  Dialog as DialogPrimitive,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

export interface DialogProps {
  trigger: ReactNode
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}

export const Dialog = ({
  trigger,
  title,
  description,
  children,
  footer
}: DialogProps) => {
  return (
    <DialogPrimitive>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className="py-4">
          {children}
        </div>
        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogPrimitive>
  )
} 