"use client"

import useSWR from 'swr'
import ContactsTable from "@/components/admin/contacts/contact-table"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ContactsPage() {
  const { data, error, isLoading, mutate } = useSWR('/api/contact', fetcher)
  console.log('data', data)
  const contacts = data?.map((contact: any) => ({
    id: contact._id,
    fullName: contact.fullName,
    email: contact.email,
    subject: contact.subject,
    message: contact.message,
    createdAt: new Date(contact.createdAt),
  })) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    // <div>hello</div>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Manage contact submissions ({contacts.length})</p>
        </div>
        <button onClick={() => mutate()}>Refresh</button>
      </div>
      <ContactsTable contacts={contacts} />
    </div>
  )
}