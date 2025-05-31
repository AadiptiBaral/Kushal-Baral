"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {toast} from "sonner"
import ProjectTagInput from "@/components/admin/projects/project-tag-input"
import { ArrowLeft, Save } from "lucide-react"

interface Tag {
  id: string
  name: string
  color: "blue" | "purple"
}

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: string
  tags: Tag[]
  status: string
  featured: boolean
  year: number
  client: string
  duration: string
  link: string
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [project, setProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    longDescription: "",
    image: "",
    category: "",
    tags: [],
    status: "",
    featured: false,
    year: new Date().getFullYear(),
    client: "",
    duration: "",
    link: "",
  })

  useEffect(() => {
    // In a real app, you would fetch the project data from your database
    // This is just mock data for demonstration
    const mockProject = {
      id: params.id,
      title: "E-commerce Platform",
      description: "A full-featured online store with payment integration",
      longDescription:
        "A comprehensive e-commerce solution built with modern technologies. Features include product catalog, shopping cart, secure checkout, payment processing, order management, and customer accounts.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web Development",
      tags: [
        { id: "1", name: "React", color: "blue" },
        { id: "2", name: "Node.js", color: "blue" },
      ],
      status: "Completed",
      featured: true,
      year: 2023,
      client: "RetailCorp",
      duration: "3 months",
      link: "https://example.com/project",
    }

    // setProject(mockProject)
    setLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProject((prev) => ({ ...prev, [name]: checked }))
  }

  const handleTagsChange = (tags: Tag[]) => {
    setProject((prev) => ({ ...prev, tags }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // In a real app, you would save the project to your database
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    setSaving(false)
   toast.success("Project updated successfully!")

    router.push("/admin/projects")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Edit the basic details of your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={project.title} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  value={project.longDescription}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={project.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Enterprise Software">Enterprise Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={project.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={project.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Additional information about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input id="client" name="client" value={project.client} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" type="number" value={project.year} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" value={project.duration} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Project Link</Label>
                  <Input id="link" name="link" type="url" value={project.link} onChange={handleChange} required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media & Tags</CardTitle>
                <CardDescription>Project image and tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" name="image" value={project.image} onChange={handleChange} required />
                  {project.image && (
                    <div className="mt-2 aspect-video bg-gray-100 dark:bg-gray-800 relative rounded-md overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <ProjectTagInput tags={project.tags} onChange={handleTagsChange} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" className="mr-2" onClick={() => router.push("/admin/projects")}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
