"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Tag {
  id: string
  name: string
}

interface ProjectTagInputProps {
  tags: Tag[]
  onChange: (tags: Tag[]) => void
  placeholder?: string
}

export default function ProjectTagInput({ tags, onChange, placeholder = "Add tags..." }: ProjectTagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addTag = (tagName: string) => {
    const trimmedName = tagName.trim()
    if (trimmedName && !tags.some((tag) => tag.name.toLowerCase() === trimmedName.toLowerCase())) {
      const newTag: Tag = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: trimmedName,
      }
      onChange([...tags, newTag])
    }
    setInputValue("")
  }

  const removeTag = (tagId: string) => {
    onChange(tags.filter((tag) => tag.id !== tagId))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1].id)
    }
  }

  const handleAddClick = () => {
    addTag(inputValue)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={handleAddClick} disabled={!inputValue.trim()}>
          Add
        </Button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
              {tag.name}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => removeTag(tag.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
