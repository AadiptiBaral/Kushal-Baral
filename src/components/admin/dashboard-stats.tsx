import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Users, FolderKanban, Star } from "lucide-react"

export default async function DashboardStats() {
  // In a real app, you would fetch this data from your database
  const stats = [
    {
      name: "Total Contacts",
      value: "24",
      icon: Mail,
      description: "Contact form submissions",
    },
    {
      name: "Projects",
      value: "12",
      icon: FolderKanban,
      description: "Portfolio projects",
    },
    {
      name: "Featured Projects",
      value: "4",
      icon: Star,
      description: "Highlighted projects",
    },
    {
      name: "Clients",
      value: "18",
      icon: Users,
      description: "Satisfied clients",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
