"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"

interface Tag {
  id: string
  name: string
}

interface ProjectTagInputProps {
  tags: Tag[]
  onChange: (tags: Tag[]) => void
}

export default function ProjectTagInput({ tags, onChange }: ProjectTagInputProps) {
  const [newTagName, setNewTagName] = useState("")

  const addTag = () => {
    if (newTagName.trim() === "") return

    const newTag: Tag = {
      id: uuidv4(),
      name: newTagName.trim(),
    }

    onChange([...tags, newTag])
    setNewTagName("")
  }

  const removeTag = (id: string) => {
    onChange(tags.filter((tag) => tag.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {tag.name}
            <button
              type="button"
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => removeTag(tag.id)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag.name} tag</span>
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag"
          className="flex-1"
        />
        <Button type="button" size="icon" onClick={addTag} disabled={!newTagName.trim()}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add tag</span>
        </Button>
      </div>
    </div>
  )
}
