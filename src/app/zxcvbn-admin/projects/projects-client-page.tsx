"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import ProjectsTable from "@/components/admin/projects/project-table"
import ProjectsTableSkeleton from "@/components/admin/projects/project-tab-skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import ProjectTagInput from "@/components/admin/projects/project-tag-input"

export default function ProjectsClientPage() {
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    client: "",
    year: new Date().getFullYear(),
    featured: false,
    tags: [] as { id: string; name: string }[],
  })

  // In a real app, you would fetch this data from your database
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-featured online store with payment integration",
      category: "Web Development",
      featured: true,
      year: 2023,
      client: "RetailCorp",
      tags: [
        { id: "1", name: "React" },
        { id: "2", name: "Node.js" },
      ],
    },
    {
      id: "2",
      title: "Mobile Banking App",
      description: "Secure and user-friendly banking application",
      category: "Mobile Development",
      featured: true,
      year: 2023,
      client: "FinanceBank",
      tags: [
        { id: "3", name: "React Native" },
        { id: "4", name: "Firebase" },
      ],
    },
    {
      id: "3",
      title: "AI Content Generator",
      description: "Content creation tool powered by artificial intelligence",
      category: "AI/ML",
      featured: true,
      year: 2022,
      client: "ContentTech",
      tags: [
        { id: "5", name: "Python" },
        { id: "6", name: "TensorFlow" },
      ],
    },
    {
      id: "4",
      title: "Healthcare Management System",
      description: "Comprehensive solution for healthcare providers",
      category: "Enterprise Software",
      featured: false,
      year: 2022,
      client: "MediCare",
      tags: [
        { id: "7", name: "Angular" },
        { id: "8", name: "Java" },
      ],
    },
    {
      id: "5",
      title: "Social Media Dashboard",
      description: "Analytics and management tool for social media accounts",
      category: "Web Development",
      featured: false,
      year: 2021,
      client: "SocialBoost",
      tags: [
        { id: "9", name: "Vue.js" },
        { id: "10", name: "Express" },
      ],
    },
  ])

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()

    const project = {
      ...newProject,
      id: uuidv4(),
      year: Number(newProject.year),
    }

    // In a real app, you would save this to your database
    setProjects([project, ...projects])

    // Reset form and close dialog
    setNewProject({
      title: "",
      description: "",
      category: "",
      client: "",
      year: new Date().getFullYear(),
      featured: false,
      tags: [],
    })

    setDialogOpen(false)
    toast.success(`${project.title} has been added successfully.`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {loading ? <ProjectsTableSkeleton /> : <ProjectsTable projects={projects} />}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleAddProject}>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Create a new project for your portfolio. Fill out the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input
                  id="client"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: parseInt(e.target.value) })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Tags</Label>
                <div className="col-span-3">
                  <ProjectTagInput
                    tags={newProject.tags}
                    onChange={(tags) => setNewProject({ ...newProject, tags })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="featured" className="text-right">
                  Featured
                </Label>
                <div className="col-span-3 flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    className="mr-2 h-4 w-4"
                  />
                  <Label htmlFor="featured" className="text-sm font-normal">
                    Mark as featured project
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
