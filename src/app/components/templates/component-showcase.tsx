'use client'

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "../atoms/switch"
import { Typography } from "../atoms/typography"
import { Spinner } from "../atoms/spinner"
import { FormField } from "../molecules/form-field"
import { UserCard } from "../molecules/user-card"
import { UserList } from "../organisms/user-list"
import { ContentCard } from "../organisms/content-card"

import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { InfoIcon, AlertTriangle, Mail, Check } from "lucide-react"
import { DatePicker } from "../atoms/date-picker"
import { DateRange } from "../molecules/date-range"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Breadcrumbs } from "../molecules/breadcrumbs"
import React, { useState } from "react";
import { Dialog } from "../atoms/dialog"
import { ConfirmationDialog } from "../molecules/confirmation-dialog"
import { SearchSelect } from "../molecules/search-select"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../atoms/table"
import { DataTable } from "../molecules/data-table"
import { UsersTable } from "../organisms/users-table"
import { AdvancedUsersTable } from "../organisms/advanced-users-table"
import { DropdownMenu as NewDropdownMenu } from "../molecules/dropdown-menu"
import { Settings, User, CreditCard, LogOut, MessageSquare, PlusCircle, UserPlus } from "lucide-react"

const DEMO_USERS_BASIC = [
  { 
    id: '1', 
    name: 'John Doe', 
    role: 'Admin', 
    status: 'online' as const, 
    avatarUrl: 'https://github.com/shadcn.png' 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    role: 'Editor', 
    status: 'away' as const
  },
  { 
    id: '3', 
    name: 'Mike Johnson', 
    role: 'User', 
    status: 'offline' as const
  },
]

const DEMO_USERS_TABLE = [
  { 
    id: '1', 
    name: 'John Doe', 
    role: 'Admin', 
    status: 'active' as const, 
    email: 'john@example.com',
    lastActive: '2024-02-20',
    avatarUrl: 'https://github.com/shadcn.png',
    department: 'engineering',
    location: 'new-york',
    skills: ['react', 'typescript', 'node']
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    role: 'Editor', 
    status: 'pending' as const,
    email: 'jane@example.com',
    lastActive: '2024-02-19',
    department: 'design',
    location: 'london',
    skills: ['design', 'marketing']
  },
  { 
    id: '3', 
    name: 'Mike Johnson', 
    role: 'User', 
    status: 'inactive' as const,
    email: 'mike@example.com',
    lastActive: '2024-02-18',
    department: 'marketing',
    location: 'berlin',
    skills: ['marketing', 'design']
  },
]

export const ComponentShowcase = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>(["red", "blue"])
  const [selectedOption, setSelectedOption] = useState<string>("1")
  const [selectedTech, setSelectedTech] = useState<string>("react")
  const [selectedAvailable, setSelectedAvailable] = useState<string>("1")
  const [selectedAsync, setSelectedAsync] = useState<string>("1")
  const [selectedUser, setSelectedUser] = useState<string>("user1")

  return (
    <div className="container mx-auto p-8 space-y-12">
      {/* Atoms Section */}
      <ContentCard
        title="Atoms"
        description="Basic building blocks of the interface"
        className="bg-card"
      >
        <div className="grid gap-8">
          {/* Typography */}
          <ComponentSection title="Typography">
            <div className="space-y-4">
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="body1">Body 1 Text</Typography>
              <Typography variant="body2">Body 2 Text</Typography>
              <Typography variant="caption">Caption Text</Typography>
              <Typography variant="overline">Overline Text</Typography>
            </div>
          </ComponentSection>

          {/* Buttons */}
          <ComponentSection title="Buttons">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </ComponentSection>

          {/* Inputs */}
          <ComponentSection title="Inputs">
            <div className="grid gap-4 max-w-md">
              <Input placeholder="Default input" />
              <Input placeholder="Disabled input" disabled />
            </div>
          </ComponentSection>

          {/* Labels */}
          <ComponentSection title="Labels">
            <div className="grid gap-4">
              <Label>Default Label</Label>
              <Label className="text-primary">Primary Label</Label>
            </div>
          </ComponentSection>

          {/* Avatars */}
          <ComponentSection title="Avatars">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="JD" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="CD" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
            </div>
          </ComponentSection>

          {/* Spinners */}
          <ComponentSection title="Spinners">
            <div className="flex gap-6 items-center">
              <Spinner size="sm" />
              <Spinner size="md" />
              {/*<Spinner size="lg" />*/}
              <Spinner variant="secondary" size="md" />
            </div>
          </ComponentSection>

          {/* Switches */}
          <ComponentSection title="Switches">
            <div className="grid gap-4 max-w-md">
              <Switch label="Notifications" id="notifications" />
              <Switch label="Email updates" id="email-updates" checked />
              <Switch label="Disabled" id="disabled" disabled />
            </div>
          </ComponentSection>

          {/* Badges */}
          <ComponentSection title="Badges">
            <div className="flex gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </ComponentSection>

          {/* Toggle */}
          <ComponentSection title="Toggle">
            <div className="flex gap-4">
              <Toggle>Toggle</Toggle>
              <Toggle pressed>Pressed</Toggle>
              <Toggle disabled>Disabled</Toggle>
            </div>
          </ComponentSection>

          {/* Date Picker */}
          <ComponentSection title="Date Picker">
            <div className="grid gap-4 max-w-[280px]">
              <DatePicker placeholder="Select a date" />
              <DatePicker placeholder="Disabled picker" disabled />
            </div>
          </ComponentSection>

          {/* Progress */}
          <ComponentSection title="Progress">
            <div className="grid gap-4 max-w-md">
              <Progress value={33} />
              <Progress value={66} />
            </div>
          </ComponentSection>

          {/* Tooltips */}
          <ComponentSection title="Tooltips">
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </ComponentSection>

          {/* Theme Toggle */}
          <ComponentSection title="Theme Toggle">
            <div className="flex gap-4 items-center">
              <ThemeToggle />
              <Typography variant="body2" className="text-muted-foreground">
                Click to toggle between light, dark, and system theme
              </Typography>
            </div>
          </ComponentSection>
        </div>
      </ContentCard>

      {/* Molecules Section */}
      <ContentCard
        title="Molecules"
        description="Combinations of atoms working together"
        className="bg-card"
      >
        <div className="grid gap-8">
          {/* Form Fields */}
          <ComponentSection title="Form Fields">
            <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
              <FormField
                label="Username"
                id="username"
                placeholder="Enter username"
                required
              />
              <FormField
                label="Password"
                id="password"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
          </ComponentSection>

          {/* Date Range */}
          <ComponentSection title="Date Range">
            <div className="grid gap-6 max-w-xl">
              <DateRange />
              <DateRange disabled />
            </div>
          </ComponentSection>

          {/* User Cards */}
          <ComponentSection title="User Cards">
            <div className="grid gap-6 md:grid-cols-2">
              <UserCard
                name="John Doe"
                role="Admin"
                status="online"
                avatarUrl="https://github.com/shadcn.png"
                onMessage={() => {}}
              />
              <UserCard
                name="Jane Smith"
                role="Editor"
                status="away"
              />
            </div>
          </ComponentSection>

          {/* Dropdown Menu */}
          <ComponentSection title="Dropdown Menu">
            <div className="flex flex-wrap gap-8">
              {/* Basic Dropdown */}
              <NewDropdownMenu
                triggerText="Account"
                items={[
                  { label: "Profile", icon: <User className="h-4 w-4" />, onClick: () => {} },
                  { label: "Billing", icon: <CreditCard className="h-4 w-4" />, onClick: () => {} },
                  { label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: () => {} },
                  { label: "Logout", icon: <LogOut className="h-4 w-4" />, variant: "destructive", onClick: () => {} }
                ]}
              />

              {/* Grouped Dropdown */}
              <NewDropdownMenu
                triggerText="Actions"
                triggerVariant="default"
                groups={[
                  {
                    label: "Messages",
                    items: [
                      { label: "Send Email", icon: <Mail className="h-4 w-4" />, onClick: () => {} },
                      { label: "Send Message", icon: <MessageSquare className="h-4 w-4" />, onClick: () => {} }
                    ]
                  },
                  {
                    label: "Create New",
                    items: [
                      { label: "Add User", icon: <UserPlus className="h-4 w-4" />, onClick: () => {} },
                      { label: "New Item", icon: <PlusCircle className="h-4 w-4" />, onClick: () => {} },
                      { label: "Disabled Item", icon: <PlusCircle className="h-4 w-4" />, disabled: true }
                    ]
                  }
                ]}
              />
            </div>
          </ComponentSection>

          {/* Alerts */}
          <ComponentSection title="Alerts">
            <div className="grid gap-4">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational message.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong!
                </AlertDescription>
              </Alert>
            </div>
          </ComponentSection>

          {/* Dialog */}
          <ComponentSection title="Dialog">
            <div className="space-y-8">
              {/* Atomic Dialog */}
              <div>
                <Typography variant="h3" className="text-base mb-4">Atomic Dialog</Typography>
                <Dialog
                  trigger={<Button variant="outline">Open Basic Dialog</Button>}
                  title="Basic Dialog"
                  description="This is a basic dialog using our atomic component"
                  footer={
                    <div className="flex gap-3">
                      <Button variant="outline">Cancel</Button>
                      <Button>Submit</Button>
                    </div>
                  }
                >
                  <FormField
                    label="Sample Input"
                    id="dialog-input"
                    placeholder="Enter some text"
                  />
                </Dialog>
              </div>

              {/* Molecular Dialog */}
              <div>
                <Typography variant="h3" className="text-base mb-4">Confirmation Dialog</Typography>
                <div className="flex gap-4">
                  <ConfirmationDialog
                    trigger={<Button variant="outline">Default Confirmation</Button>}
                    title="Confirm Action"
                    description="Are you sure you want to perform this action?"
                    onConfirm={() => {}}
                    onCancel={() => {}}
                  />
                  <ConfirmationDialog
                    trigger={<Button variant="outline">Delete Confirmation</Button>}
                    title="Delete Item"
                    description="Are you sure you want to delete this item? This action cannot be undone."
                    onConfirm={() => {}}
                    onCancel={() => {}}
                    confirmText="Delete"
                    variant="destructive"
                  />
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Advanced Form Controls */}
          <ComponentSection title="Advanced Form Controls">
            <div className="grid gap-6 max-w-md">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <RadioGroup defaultValue="option-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-2" id="option-2" />
                  <Label htmlFor="option-2">Option 2</Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label>Volume</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
          </ComponentSection>

          {/* Breadcrumbs */}
          <ComponentSection title="Breadcrumbs">
            <Breadcrumbs
              items={[
                {
                  label: "Home",
                  href: "/",
                  icon: <Home className="h-4 w-4" />
                },
                {
                  label: "Products",
                  href: "/products"
                },
                {
                  label: "Categories",
                  href: "/products/categories"
                }
              ]}
            />
          </ComponentSection>

          {/* Search Select */}
          <ComponentSection title="Search Select">
            <div className="grid gap-6 max-w-md">
              {/* Basic Single Select */}
              <SearchSelect
                label="Basic Single Select (with clear button)"
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                  { value: "3", label: "Option 3" },
                  { value: "4", label: "Another Option" },
                  { value: "5", label: "Something Else" },
                  { value: "6", label: "Final Option" },
                ]}
                value={selectedOption}
                onChange={(value) => setSelectedOption(value as string)}
                placeholder="Select an option..."
              />

              {/* Multi Select */}
              <SearchSelect
                label="Multi Select (max 3, with clear badges)"
                options={[
                  { value: "red", label: "Red" },
                  { value: "blue", label: "Blue" },
                  { value: "green", label: "Green" },
                  { value: "yellow", label: "Yellow" },
                  { value: "purple", label: "Purple" },
                ]}
                isMulti
                maxSelected={3}
                value={selectedColors}
                onChange={(value) => setSelectedColors(value as string[])}
                placeholder="Select colors..."
              />

              {/* Grouped Options */}
              <SearchSelect
                label="Grouped Options"
                options={[
                  { value: "react", label: "React", group: "Frontend" },
                  { value: "vue", label: "Vue", group: "Frontend" },
                  { value: "angular", label: "Angular", group: "Frontend" },
                  { value: "node", label: "Node.js", group: "Backend" },
                  { value: "python", label: "Python", group: "Backend" },
                  { value: "java", label: "Java", group: "Backend" },
                ]}
                value={selectedTech}
                onChange={(value) => setSelectedTech(value as string)}
                placeholder="Select technology..."
              />

              {/* With Disabled Options */}
              <SearchSelect
                label="With Disabled Options"
                options={[
                  { value: "1", label: "Available Option" },
                  { value: "2", label: "Disabled Option", disabled: true },
                  { value: "3", label: "Another Available" },
                  { value: "4", label: "Also Disabled", disabled: true },
                ]}
                value={selectedAvailable}
                onChange={(value) => setSelectedAvailable(value as string)}
                placeholder="Select an option..."
              />

              {/* Async Loading Example */}
              <SearchSelect
                label="Async Search"
                options={[
                  { value: "1", label: "Initial Option 1" },
                  { value: "2", label: "Initial Option 2" },
                ]}
                value={selectedAsync}
                onChange={(value) => setSelectedAsync(value as string)}
                isAsync
                onSearch={async (query) => {
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  console.log('Async search:', query)
                }}
                placeholder="Type to search..."
                isLoading={false}
              />

              {/* Custom Option Rendering */}
              <SearchSelect<{ role: string; avatar: string }>
                label="Custom Option Rendering"
                options={[
                  { 
                    value: "user1",
                    label: "John Doe",
                    meta: { role: "Admin", avatar: "https://github.com/shadcn.png" }
                  },
                  { 
                    value: "user2",
                    label: "Jane Smith",
                    meta: { role: "User", avatar: "https://github.com/shadcn.png" }
                  }
                ]}
                value={selectedUser}
                onChange={(value) => setSelectedUser(value as string)}
                renderOption={(option) => (
                  <Button
                    variant="ghost"
                    className="w-full px-3 py-2 justify-start"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        <AvatarImage src={option.meta?.avatar} alt={option.label} />
                        <AvatarFallback>{option.label[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start min-w-0">
                        <span className="truncate w-full">{option.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {option.meta?.role}
                        </span>
                      </div>
                    </div>
                  </Button>
                )}
                placeholder="Select a user..."
              />
            </div>
          </ComponentSection>
        </div>
      </ContentCard>

      {/* Organisms Section */}
      <ContentCard
        title="Organisms"
        description="Complex UI patterns composed of molecules"
        className="bg-card"
      >
        <div className="grid gap-8">
          {/* User List */}
          <ComponentSection title="User List with Filtering">
            <UserList users={DEMO_USERS_BASIC} onMessageUser={(id) => alert(`Message user ${id}`)} />
          </ComponentSection>

          {/* Tabbed Interface */}
          <ComponentSection title="Tabbed Interface">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="account">Account Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <ContentCard
                  title="Personal Information"
                  description="Update your personal details"
                  footer={
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  }
                >
                  <div className="grid gap-6">
                    <FormField
                      label="Full Name"
                      id="fullName"
                      placeholder="John Doe"
                    />
                    <FormField
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                    <FormField
                      label="Phone"
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </ContentCard>
              </TabsContent>
              <TabsContent value="account">
                <ContentCard
                  title="Account Settings"
                  description="Manage your account preferences"
                  footer={
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  }
                >
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Email Notifications</Label>
                        <Typography variant="body2" className="text-muted-foreground">
                          Receive email updates about your account
                        </Typography>
                      </div>
                      <Switch id="email-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Two-Factor Authentication</Label>
                        <Typography variant="body2" className="text-muted-foreground">
                          Add an extra layer of security to your account
                        </Typography>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                </ContentCard>
              </TabsContent>
            </Tabs>
          </ComponentSection>
        </div>
      </ContentCard>

      {/* Templates Section */}
      <ContentCard
        title="Templates"
        description="Page-level objects that place components into a layout"
        className="bg-card"
      >
        <div className="grid gap-8">
          {/* Dashboard Template */}
          <ComponentSection title="Dashboard Template">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ContentCard title="Quick Stats" description="Key metrics">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Typography variant="h3">254</Typography>
                    <Typography variant="body2" className="text-muted-foreground">Total Users</Typography>
                  </div>
                  <div className="text-center">
                    <Typography variant="h3">89%</Typography>
                    <Typography variant="body2" className="text-muted-foreground">Engagement</Typography>
                  </div>
                </div>
              </ContentCard>
              <ContentCard title="Recent Activity" description="Latest updates">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <Typography variant="body2">New user registered</Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <Typography variant="body2">10 new messages</Typography>
                  </div>
                </div>
              </ContentCard>
              <ContentCard title="Quick Actions" description="Common tasks">
                <div className="grid gap-4">
                  <Button className="w-full">Create New User</Button>
                  <Button variant="outline" className="w-full">Generate Report</Button>
                </div>
              </ContentCard>
            </div>
          </ComponentSection>
        </div>
      </ContentCard>

      {/* Tables Section */}
      <ContentCard
        title="Tables"
        description="Table components from atoms to organisms"
        className="bg-card"
      >
        <div className="grid gap-8">
          {/* Atomic Table */}
          <ComponentSection title="Basic Table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_USERS_TABLE.slice(0, 2).map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ComponentSection>

          {/* Molecular Data Table */}
          <ComponentSection title="Data Table">
            <DataTable
              columns={[
                { header: "Name", accessorKey: "name", sortable: true },
                { header: "Status", accessorKey: "status" },
                { header: "Role", accessorKey: "role" },
              ]}
              data={DEMO_USERS_TABLE}
              searchable
              searchKey="name"
              pagination
              pageSize={2}
            />
          </ComponentSection>

          {/* Organism Users Table */}
          <ComponentSection title="Users Table">
            <UsersTable
              users={DEMO_USERS_TABLE}
              onEdit={(user) => console.log('Edit:', user)}
              onDelete={(user) => console.log('Delete:', user)}
              onEmailUser={(user) => console.log('Email:', user)}
            />
          </ComponentSection>

          {/* Advanced Users Table */}
          <ComponentSection title="Advanced Users Table">
            <AdvancedUsersTable
              users={DEMO_USERS_TABLE}
              onEdit={(user) => console.log('Edit:', user)}
              onDelete={(user) => console.log('Delete:', user)}
              onEmailUser={(user) => console.log('Email:', user)}
            />
          </ComponentSection>
        </div>
      </ContentCard>
    </div>
  )
}

// Component Section wrapper for consistent styling
const ComponentSection = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {children}
    </div>
  )
}

export default ComponentShowcase 