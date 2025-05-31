import type React from "react"
import type { Metadata } from "next"
import Sidebar from "@/components/admin/sidebar"
import Header from "@/components/admin/header"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for content management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
