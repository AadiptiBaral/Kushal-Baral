import type React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/admin/sidebar";

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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
