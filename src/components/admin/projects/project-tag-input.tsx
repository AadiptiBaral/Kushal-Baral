"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from "uuid"

interface Tag {
  id: string
  name: string
  color: "blue" | "purple"
}

interface ProjectTagInputProps {
  tags: Tag[]
  onChange: (tags: Tag[]) => void
}

export default function ProjectTagInput({ tags, onChange }: ProjectTagInputProps) {
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState<"blue" | "purple">("blue")

  const addTag = () => {
    if (newTagName.trim() === "") return

    const newTag: Tag = {
      id: uuidv4(),
      name: newTagName.trim(),
      color: newTagColor,
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
            className={
              tag.color === "blue"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            }
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
        <Select value={newTagColor} onValueChange={(value: "blue" | "purple") => setNewTagColor(value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" size="icon" onClick={addTag} disabled={!newTagName.trim()}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add tag</span>
        </Button>
      </div>
    </div>
  )
}
