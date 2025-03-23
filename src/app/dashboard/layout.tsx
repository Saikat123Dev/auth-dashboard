import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/dashboard/sidebar-context"
import { Toaster } from "sonner"
import { AuthCheck } from "@/lib/auth-check"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthCheck>
        <SidebarProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </AuthCheck>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

