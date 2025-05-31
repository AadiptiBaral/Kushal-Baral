import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export default async function RecentContacts() {
  // In a real app, you would fetch this data from your database
  const contacts = [
    {
      id: "1",
      fullName: "John Smith",
      email: "john@example.com",
      subject: "Project Inquiry",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "2",
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Collaboration Opportunity",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: "3",
      fullName: "Michael Brown",
      email: "michael@example.com",
      subject: "Website Redesign",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
        <CardDescription>Latest contact form submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{contact.fullName}</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{contact.subject}</Badge>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(contact.createdAt, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
