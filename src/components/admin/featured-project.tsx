import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default async function FeaturedProjects() {
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
        { id: "1", name: "React", color: "blue" },
        { id: "2", name: "Node.js", color: "blue" },
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
        { id: "3", name: "React Native", color: "blue" },
        { id: "4", name: "Firebase", color: "purple" },
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
        { id: "5", name: "Python", color: "blue" },
        { id: "6", name: "TensorFlow", color: "purple" },
      ],
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Featured Projects</CardTitle>
          <CardDescription>Highlighted portfolio projects</CardDescription>
        </div>
        <Link href="/admin/projects/new">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">Project Image</div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate">{project.title}</h3>
                    <Badge variant="outline">{project.year}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-2 pt-2">
                    {project.tags.map((tag) => (
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
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
