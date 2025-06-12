import type React from "react";
import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/sidebar";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AuthProvider from "../context/AuthProvider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for content management",
  icons: {
    icon: "/favicon.png",
    // apple: "/apple-touch-icon.png",
    // other: [
    //   {
    //     rel: "icon",
    //     url: "/favicon-32x32.png",
    //     sizes: "32x32",
    //   },
    //   {
    //     rel: "icon",
    //     url: "/favicon-16x16.png",
    //     sizes: "16x16",
    //   },
    // ],
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>
          <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-px bg-sidebar-border" />
                <h2 className="font-semibold">Admin Dashboard</h2>
              </header>
              <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}