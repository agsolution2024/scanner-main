import { useState, useEffect, useRef, ReactNode } from 'react'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { Typography } from '../atoms/typography'
import { ChevronDown, X, Check, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface SearchSelectOption<TMeta = unknown> {
  value: string
  label: string
  group?: string
  disabled?: boolean
  meta?: TMeta
}

export interface SearchSelectProps<TMeta = unknown> {
  options: SearchSelectOption<TMeta>[]
  value?: string | string[] // Support for single and multi-select
  onChange?: (value: string | string[]) => void
  onSearch?: (query: string) => Promise<void> | void
  placeholder?: string
  label?: string
  className?: string
  error?: string
  isMulti?: boolean
  isLoading?: boolean
  isAsync?: boolean
  renderOption?: (option: SearchSelectOption<TMeta>) => ReactNode
  maxSelected?: number
  disabled?: boolean
}

export const SearchSelect = <TMeta = unknown>({
  options,
  value = [],
  onChange,
  onSearch,
  placeholder = "Select an option...",
  label,
  className = "",
  error,
  isMulti = false,
  isLoading = false,
  isAsync = false,
  renderOption,
  maxSelected,
  disabled
}: SearchSelectProps<TMeta>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [isSearching, setIsSearching] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Convert value to array for consistent handling
  const selectedValues = Array.isArray(value) ? value : value ? [value] : []
  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value))

  // Group options
  const groupedOptions = filteredOptions.reduce((acc, option) => {
    const group = option.group || 'default'
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(option)
    return acc
  }, {} as Record<string, SearchSelectOption<TMeta>[]>)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isAsync) {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredOptions(filtered)
    }
  }, [searchQuery, options, isAsync])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (isAsync && onSearch) {
      setIsSearching(true)
      try {
        await onSearch(query)
      } finally {
        setIsSearching(false)
      }
    }
  }

  const handleSelect = (option: SearchSelectOption<TMeta>) => {
    if (option.disabled) return

    if (isMulti) {
      const newValue = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : maxSelected && selectedValues.length >= maxSelected
          ? selectedValues
          : [...selectedValues, option.value]

      if (onChange) {
        onChange(newValue)
      }
    } else {
      if (onChange) {
        onChange(option.value)
      }
      setIsOpen(false)
    }
    
    if (!isMulti) {
      setSearchQuery("")
    }
  }

  const clearSelection = (valueToRemove?: string) => {
    if (onChange) {
      if (valueToRemove && isMulti) {
        onChange(selectedValues.filter(v => v !== valueToRemove))
      } else {
        onChange(isMulti ? [] : "")
      }
    }
    if (!isMulti) {
      setSearchQuery("")
    }
  }

  const renderSelectedValue = () => {
    if (!selectedValues.length) {
      return <span className="text-muted-foreground">{placeholder}</span>
    }

    if (isMulti) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map(option => (
            <Badge key={option.value} variant="secondary" className="gap-1 pr-1">
              {option.label}
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  clearSelection(option.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    clearSelection(option.value)
                  }
                }}
                className="cursor-pointer focus:outline-none hover:opacity-80"
              >
                <X className="h-3 w-3" />
              </span>
            </Badge>
          ))}
        </div>
      )
    }

    return <span className="truncate">{selectedOptions[0]?.label}</span>
  }

  const renderOptionItem = (option: SearchSelectOption<TMeta>) => {
    if (renderOption) {
      return (
        <div key={option.value}>
          {renderOption(option)}
        </div>
      )
    }

    return (
      <Button
        key={option.value}
        variant="ghost"
        className={`w-full justify-between px-3 py-2 text-left font-normal ${
          option.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => handleSelect(option)}
        disabled={option.disabled}
      >
        <span className="truncate">{option.label}</span>
        {selectedValues.includes(option.value) && (
          <Check className="h-4 w-4" />
        )}
      </Button>
    )
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const handleClear = () => {
    clearSelection()
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <Typography variant="body2" className="mb-2 font-medium">
          {label}
        </Typography>
      )}
      
      <div className="relative">
        <Button
          variant="outline"
          className="w-full min-h-10 justify-between"
          onClick={toggleOpen}
          type="button"
          disabled={disabled || isLoading}
        >
          <span className="flex-1 text-left">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-muted-foreground">Loading...</span>
              </div>
            ) : (
              renderSelectedValue()
            )}
          </span>
          <div className="flex items-center gap-2">
            {(value && !disabled) && (
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                className="cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="max-h-60 overflow-auto p-1">
            {isSearching ? (
              <div className="py-2 px-3 text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="py-2 px-3 text-sm text-muted-foreground">
                No options found
              </div>
            ) : (
              Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <div key={group}>
                  {group !== 'default' && (
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                      {group}
                    </div>
                  )}
                  {groupOptions.map(renderOptionItem)}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {error && (
        <Typography variant="caption" className="mt-1 text-destructive">
          {error}
        </Typography>
      )}
    </div>
  )
} 