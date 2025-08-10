import { DataTable } from "../molecules/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "../atoms/button"
import { MoreHorizontal, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  avatarUrl?: string
}

interface UsersTableProps {
  users: User[]
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onEmailUser?: (user: User) => void
}

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-gray-500",
  pending: "bg-yellow-500",
}

export const UsersTable = ({
  users,
  onEdit,
  onDelete,
  onEmailUser,
}: UsersTableProps) => {
  const columns = [
    {
      header: "User",
      accessorKey: "name" as const,
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role" as const,
      cell: (user: User) => (
        <Badge variant="secondary">{user.role}</Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status" as const,
      cell: (user: User) => (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${statusColors[user.status]}`}
          />
          <span className="capitalize">{user.status}</span>
        </div>
      ),
    },
    {
      header: "Last Active",
      accessorKey: "lastActive" as const,
      sortable: true,
    },
    {
      header: "Actions",
      accessorKey: "id" as const,
      cell: (user: User) => (
        <div className="flex items-center gap-2">
          {onEmailUser && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEmailUser(user)}
            >
              <Mail className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(user)}>
                  Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(user)}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={users}
      searchable
      searchKey="name"
      pagination
      pageSize={5}
    />
  )
} 