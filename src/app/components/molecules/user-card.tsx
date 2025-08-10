'use client'

import { Avatar } from "../atoms/avatar"
import { Button } from "../atoms/button"
import { Badge } from "@/components/ui/badge"

interface UserCardProps {
  name: string
  role: string
  status: 'online' | 'offline' | 'away'
  avatarUrl?: string
  onMessage?: () => void
}

export const UserCard = ({
  name,
  role,
  status,
  avatarUrl,
  onMessage
}: UserCardProps) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500'
  }

  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg border bg-card">
      <div className="relative">
        <Avatar
          src={avatarUrl}
          fallback={name.charAt(0)}
          alt={name}
        />
        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusColors[status]} ring-2 ring-white`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground truncate">
          {name}
        </p>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {role}
          </Badge>
          <span className="text-xs text-muted-foreground capitalize">
            {status}
          </span>
        </div>
      </div>
      {onMessage && (
        <Button variant="ghost" size="sm" onClick={onMessage}>
          Message
        </Button>
      )}
    </div>
  )
}

export default UserCard 