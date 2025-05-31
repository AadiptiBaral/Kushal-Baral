import type { Metadata } from "next"
import ContactsTable from "@/components/admin/contacts/contact-table"

export const metadata: Metadata = {
  title: "Contacts Management",
  description: "Manage contact form submissions",
}

export default async function ContactsPage() {
  // In a real app, you would fetch this data from your database
  const contacts = [
    {
      id: "1",
      fullName: "John Smith",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "I'm interested in working with you on a new project. Can we schedule a call to discuss the details?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "2",
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Collaboration Opportunity",
      message: "I have a collaboration opportunity that I think would be perfect for your skills. Let's connect!",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: "3",
      fullName: "Michael Brown",
      email: "michael@example.com",
      subject: "Website Redesign",
      message:
        "We're looking to redesign our company website and were impressed by your portfolio. What would be your availability for this project?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    },
    {
      id: "4",
      fullName: "Emily Davis",
      email: "emily@example.com",
      subject: "Consultation Request",
      message:
        "I'd like to book a consultation to discuss my project needs. What's your availability in the coming weeks?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    },
    {
      id: "5",
      fullName: "David Wilson",
      email: "david@example.com",
      subject: "Speaking Engagement",
      message:
        "We're organizing a tech conference and would love to have you as a speaker. Please let me know if you're interested.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">Manage contact form submissions</p>
      </div>
      <ContactsTable contacts={contacts} />
    </div>
  )
}
