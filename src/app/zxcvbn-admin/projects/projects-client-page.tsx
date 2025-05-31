"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import ProjectsTable from "@/components/admin/projects/project-table"
import ProjectsTableSkeleton from "@/components/admin/projects/project-tab-skeleton"

export default function ProjectsClientPage() {
  const [loading, setLoading] = useState(false)

  // In a real app, you would fetch this data from your database
  const projects = [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-featured online store with payment integration",
      category: "Web Development",
      featured: true,
      year: 2023,
      client: "RetailCorp",
      tags: [
        { id: "1", name: "React", color: "blue" as const },
        { id: "2", name: "Node.js", color: "blue" as const },
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
        { id: "3", name: "React Native", color: "blue" as const },
        { id: "4", name: "Firebase", color: "purple" as const },
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
        { id: "5", name: "Python", color: "blue" as const },
        { id: "6", name: "TensorFlow", color: "purple" as const },
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
        { id: "7", name: "Angular", color: "blue" as const },
        { id: "8", name: "Java", color: "purple" as const },
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
        { id: "9", name: "Vue.js", color: "blue" as const },
        { id: "10", name: "Express", color: "purple" as const },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      {loading ? <ProjectsTableSkeleton /> : <ProjectsTable projects={projects} />}
    </div>
  )
}
