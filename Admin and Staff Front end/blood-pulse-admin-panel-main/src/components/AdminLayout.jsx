
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"

export function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1">
          <div className="border-b border-border bg-card p-4 flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Admin đang online</span>
            </div>
          </div>
          <div className="overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
