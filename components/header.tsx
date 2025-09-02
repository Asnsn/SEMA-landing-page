"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

const activities = [
  { name: "Ballet", href: "/atividades/ballet" },
  { name: "Futebol", href: "/atividades/futebol" },
  { name: "Judô", href: "/atividades/judo" },
  { name: "Capoeira", href: "/atividades/capoeira" },
  { name: "Vôlei", href: "/atividades/volei" },
  { name: "Natação", href: "/atividades/natacao" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            S
          </div>
          <span className="text-xl font-bold text-primary">SEMA</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#sobre" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
              <span>Atividades</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/atividades" className="w-full">
                  Ver Todas
                </Link>
              </DropdownMenuItem>
              <div className="border-t my-1"></div>
              {activities.map((activity) => (
                <DropdownMenuItem key={activity.href} asChild>
                  <Link href={activity.href} className="w-full">
                    {activity.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Notícias
          </Link>
          <Link href="/#contato" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90">Apoie Nossa Causa</Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    S
                  </div>
                  <span className="text-xl font-bold text-primary">SEMA</span>
                </Link>

                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/#sobre"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sobre
                  </Link>

                  <div className="space-y-2">
                    <Link
                      href="/atividades"
                      className="text-lg font-medium hover:text-primary transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      Atividades
                    </Link>
                    <div className="pl-4 space-y-2">
                      {activities.map((activity) => (
                        <Link
                          key={activity.href}
                          href={activity.href}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {activity.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/blog"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Notícias
                  </Link>
                  <Link
                    href="/#contato"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contato
                  </Link>
                </nav>

                <Button className="bg-secondary hover:bg-secondary/90 w-full" onClick={() => setIsOpen(false)}>
                  Apoie Nossa Causa
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
