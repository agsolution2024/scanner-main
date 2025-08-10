import { Button } from "../atoms/button"
import { Dialog } from "../atoms/dialog"
import { ReactNode } from "react"

export interface ConfirmationDialogProps {
  trigger: ReactNode
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  children?: ReactNode
}

export const ConfirmationDialog = ({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  children
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      footer={
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      {children || <div />}
    </Dialog>
  )
} 