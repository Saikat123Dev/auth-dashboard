"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/dashboard/sidebar-context"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>{children}</SidebarProvider>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

