"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="text-lg font-semibold">
            Dashboard
          </Link>
          <Link href="/admin/noticias" className="text-sm">
            Notícias
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
