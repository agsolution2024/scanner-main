import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../atoms/table"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { ChevronDown, ChevronUp, Search, X } from "lucide-react"
import React, { useState, useMemo } from "react"
import { SearchSelect } from "./search-select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export type FilterType = 'text' | 'select' | 'multiSelect' | 'date' | 'number'

export interface FilterConfig<T> {
  type: FilterType
  options?: { value: string; label: string }[]
  field: keyof T
  placeholder?: string
}

export interface Column<T> {
  header: string
  accessorKey: keyof T
  sortable?: boolean
  filterable?: boolean
  filterConfig?: FilterConfig<T>
  cell?: (row: T) => React.ReactNode
}

export interface AdvancedDataTableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  pagination?: boolean
  pageSize?: number
  selectable?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  getRowId?: (row: T) => string
  renderSelectionToolbar?: (selectedItems: T[]) => React.ReactNode
}

interface Filter {
  field: string
  value: string | string[]
  type: FilterType
}

export function AdvancedDataTable<T extends { id: string }>({
  columns,
  data,
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  getRowId = (row: T) => row.id,
  renderSelectionToolbar,
}: AdvancedDataTableProps<T>) {
  const [filters, setFilters] = useState<Filter[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return filters.every((filter) => {
        const value = item[filter.field as keyof T]
        
        switch (filter.type) {
          case 'text':
            return String(value)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase())
          
          case 'select':
            return String(value) === filter.value
          
          case 'multiSelect':
            return (filter.value as string[]).some(v => 
              String(value).toLowerCase() === v.toLowerCase()
            )
          
          case 'number':
            return String(value) === filter.value
          
          case 'date':
            return String(value).includes(String(filter.value))
          
          default:
            return true
        }
      })
    })
  }, [data, filters])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue === bValue) return 0

      if (sortConfig.direction === "asc") {
        return aValue < bValue ? -1 : 1
      } else {
        return aValue > bValue ? -1 : 1
      }
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return sortedData.slice(start, end)
  }, [sortedData, currentPage, pageSize, pagination])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleFilter = (field: string, value: string | string[], type: FilterType) => {
    setFilters(current => {
      const existingFilter = current.find(f => f.field === field)
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return current.filter(f => f.field !== field)
      }
      if (existingFilter) {
        return current.map(f => 
          f.field === field ? { ...f, value } : f
        )
      }
      return [...current, { field, value, type }]
    })
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handleRowSelection = (rowId: string, checked: boolean) => {
    const newSelection = new Set(selectedRows)
    if (checked) {
      newSelection.add(rowId)
    } else {
      newSelection.delete(rowId)
    }
    setSelectedRows(newSelection)
    onSelectionChange?.(
      sortedData.filter(row => newSelection.has(getRowId(row)))
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelection = new Set(paginatedData.map(row => getRowId(row)))
      setSelectedRows(newSelection)
      onSelectionChange?.(paginatedData)
    } else {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    }
  }

  const renderFilterComponent = (column: Column<T>) => {
    if (!column.filterConfig) return null

    const { type, options, field, placeholder } = column.filterConfig
    const currentFilter = filters.find(f => f.field === field)

    switch (type) {
      case 'text':
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={placeholder || `Search ${String(field)}...`}
              value={currentFilter?.value || ''}
              onChange={(e) => handleFilter(String(field), e.target.value, type)}
              className="pl-10"
            />
          </div>
        )

      case 'select':
        return (
          <SearchSelect
            options={options || []}
            value={currentFilter?.value as string || ''}
            onChange={(value) => handleFilter(String(field), value as string, type)}
            placeholder={placeholder || `Select ${String(field)}...`}
          />
        )

      case 'multiSelect':
        return (
          <SearchSelect
            options={options || []}
            value={currentFilter?.value as string[] || []}
            onChange={(value) => handleFilter(String(field), value as string[], type)}
            placeholder={placeholder || `Select ${String(field)}...`}
            isMulti
          />
        )

      default:
        return null
    }
  }

  const selectedItems = sortedData.filter(row => selectedRows.has(getRowId(row)))

  return (
    <div className="space-y-4">
      {/* Active Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.field}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <span>
                {String(filter.field)}:{' '}
                {Array.isArray(filter.value)
                  ? filter.value.join(', ')
                  : filter.value}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleFilter(filter.field, '', filter.type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters([])}
            className="h-6"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Selection Toolbar */}
      {selectable && selectedItems.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSelectAll(false)}
            >
              Clear selection
            </Button>
          </div>
          {renderSelectionToolbar?.(selectedItems)}
        </div>
      )}

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {columns
          .filter((column) => column.filterable && column.filterConfig)
          .map((column) => (
            <div key={String(column.accessorKey)}>
              <div className="mb-2 text-sm font-medium">
                {column.header}
              </div>
              {renderFilterComponent(column)}
            </div>
          ))}
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    paginatedData.length > 0 &&
                    paginatedData.every(row => 
                      selectedRows.has(getRowId(row))
                    )
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={String(column.accessorKey)}
                className={column.sortable ? "cursor-pointer select-none" : ""}
                onClick={() => {
                  if (column.sortable) {
                    handleSort(column.accessorKey)
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortConfig.key === column.accessorKey && (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex}
              className={selectedRows.has(getRowId(row)) ? "bg-muted/50" : ""}
            >
              {selectable && (
                <TableCell className="w-[50px]">
                  <Checkbox
                    checked={selectedRows.has(getRowId(row))}
                    onCheckedChange={(checked) => 
                      handleRowSelection(getRowId(row), checked as boolean)
                    }
                    aria-label={`Select row ${rowIndex + 1}`}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={String(column.accessorKey)}>
                  {column.cell
                    ? column.cell(row)
                    : String(row[column.accessorKey])}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {paginatedData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={selectable ? columns.length + 1 : columns.length}
                className="h-24 text-center"
              >
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 