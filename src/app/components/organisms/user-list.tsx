'use client'

import { UserCard } from "../molecules/user-card"
import { Input } from "../atoms/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { ChangeEvent } from "react"

interface User {
  id: string
  name: string
  role: string
  status: 'online' | 'offline' | 'away'
  avatarUrl?: string
}

interface UserListProps {
  users: User[]
  onMessageUser?: (userId: string) => void
}

export const UserList = ({ users, onMessageUser }: UserListProps) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="away">Away</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            role={user.role}
            status={user.status}
            avatarUrl={user.avatarUrl}
            onMessage={onMessageUser ? () => onMessageUser(user.id) : undefined}
          />
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList 