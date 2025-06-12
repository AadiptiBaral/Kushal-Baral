"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Mail, User, FolderKanban, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

const navigation = [
  { name: "Dashboard", href: "/zxcvbn-admin", icon: LayoutDashboard },
  { name: "Contacts", href: "/zxcvbn-admin/contacts", icon: Mail },
  { name: "Introduction", href: "/zxcvbn-admin/introduction", icon: User },
  { name: "Projects", href: "/zxcvbn-admin/projects", icon: FolderKanban },
  { name: "Settings", href: "/zxcvbn-admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="hidden md:flex">
      <SidebarHeader className="px-4 py-5">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = item.href === "/zxcvbn-admin" 
                  ? pathname === "/zxcvbn-admin"
                  : pathname.startsWith(`${item.href}/`) || pathname === item.href
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        isActive
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn(
                            isActive
                              ? "text-gray-500 dark:text-gray-300"
                              : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                            "mr-3 flex-shrink-0 h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                signOut({ callbackUrl: "/zxcvbn-auth/signin" })
              }}
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
            >
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}