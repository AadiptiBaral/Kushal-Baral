import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Contact {
  id: string
  fullName: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

interface ContactDetailsProps {
  contact: Contact
}

export default function ContactDetails({ contact }: ContactDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
          <p className="text-sm font-semibold">{contact.fullName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
          <p className="text-sm font-semibold">{contact.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
        <div className="mt-1">
          <Badge variant="outline">{contact.subject}</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
        <Card className="mt-1">
          <CardContent className="p-4 text-sm">{contact.message}</CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Received</h3>
        <p className="text-sm">{formatDistanceToNow(contact.createdAt, { addSuffix: true })}</p>
      </div>
    </div>
  )
}
