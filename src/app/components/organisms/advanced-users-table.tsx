import { AdvancedDataTable } from "../molecules/advanced-data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "../atoms/button"
import { MoreHorizontal, Mail, Trash2, Send } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  department: string
  location: string
  avatarUrl?: string
  skills: string[]
}

interface AdvancedUsersTableProps {
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

const departments = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
]

const locations = [
  { value: "new-york", label: "New York" },
  { value: "london", label: "London" },
  { value: "tokyo", label: "Tokyo" },
  { value: "berlin", label: "Berlin" },
  { value: "singapore", label: "Singapore" },
]

const skills = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "node", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "design", label: "UI/UX Design" },
  { value: "marketing", label: "Digital Marketing" },
]

export const AdvancedUsersTable = ({
  users,
  onEdit,
  onDelete,
  onEmailUser,
}: AdvancedUsersTableProps) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const handleBulkDelete = () => {
    selectedUsers.forEach(user => onDelete?.(user))
    setSelectedUsers([])
  }

  const handleBulkEmail = () => {
    selectedUsers.forEach(user => onEmailUser?.(user))
    setSelectedUsers([])
  }

  const renderSelectionToolbar = () => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBulkEmail}
        disabled={!onEmailUser}
      >
        <Send className="h-4 w-4 mr-2" />
        Email Selected
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleBulkDelete}
        disabled={!onDelete}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete Selected
      </Button>
    </div>
  )

  const columns = [
    {
      header: "User",
      accessorKey: "name" as const,
      filterable: true,
      filterConfig: {
        type: "text" as const,
        field: "name" as keyof User,
        placeholder: "Search users..."
      },
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
      header: "Department",
      accessorKey: "department" as const,
      filterable: true,
      filterConfig: {
        type: "select" as const,
        field: "department" as keyof User,
        options: departments,
        placeholder: "Filter by department"
      },
      cell: (user: User) => (
        <Badge variant="secondary">{user.department}</Badge>
      ),
    },
    {
      header: "Location",
      accessorKey: "location" as const,
      filterable: true,
      filterConfig: {
        type: "select" as const,
        field: "location" as keyof User,
        options: locations,
        placeholder: "Filter by location"
      },
    },
    {
      header: "Skills",
      accessorKey: "skills" as const,
      filterable: true,
      filterConfig: {
        type: "multiSelect" as const,
        field: "skills" as keyof User,
        options: skills,
        placeholder: "Filter by skills"
      },
      cell: (user: User) => (
        <div className="flex flex-wrap gap-1">
          {user.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs"
            >
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status" as const,
      filterable: true,
      filterConfig: {
        type: "select" as const,
        field: "status" as keyof User,
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ],
      },
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
            <DropdownMenuTrigger>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                <MoreHorizontal className="h-4 w-4" />
              </span>
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
    <AdvancedDataTable
      columns={columns}
      data={users}
      pagination
      pageSize={5}
      selectable
      onSelectionChange={setSelectedUsers}
      renderSelectionToolbar={renderSelectionToolbar}
    />
  )
} 