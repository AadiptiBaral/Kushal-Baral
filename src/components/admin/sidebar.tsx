"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Mail, User, FolderKanban, Settings, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/zxcvbn-admin", icon: LayoutDashboard },
  { name: "Contacts", href: "/zxcvbn-admin/contacts", icon: Mail },
  { name: "Introduction", href: "/zxcvbn-admin/introduction", icon: User },
  { name: "Projects", href: "/zxcvbn-admin/projects", icon: FolderKanban },
  { name: "Settings", href: "/zxcvbn-admin/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-full">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="mt-8 flex flex-col flex-1">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = item.href === "/zxcvbn-admin" 
                ? pathname === "/zxcvbn-admin"
                : pathname.startsWith(`${item.href}/`) || pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive
                        ? "text-gray-500 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="px-2 pb-4">
            <button className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 w-full">
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
