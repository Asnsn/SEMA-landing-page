"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell } from "lucide-react"
import { useState } from "react"
import { AdminMobileSidebar } from "./admin-mobile-sidebar"

interface AdminHeaderProps {
  user: {
    id: string
    email: string
    full_name: string | null
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <AdminMobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Abrir sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </Button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex flex-1"></div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Ver notificações</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </Button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

            {/* Profile */}
            <div className="flex items-center gap-x-2">
              <div className="hidden lg:flex lg:flex-col lg:text-right lg:leading-tight">
                <span className="text-sm font-semibold text-gray-900">{user.full_name || user.email}</span>
                <span className="text-xs text-gray-500 capitalize">{user.role}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {(user.full_name || user.email).charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
