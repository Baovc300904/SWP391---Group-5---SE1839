
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
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Bell, 
  Settings, 
  Database,
  Shield,
  Activity,
  FileText,
  Download,
  Upload,
  LogOut
} from "lucide-react"
import { useLocation } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý nhân viên",
    items: [
      {
        title: "Phân quyền",
        url: "/staff/roles",
        icon: Shield,
      },
      {
        title: "Hoạt động nhân viên",
        url: "/staff/activities",
        icon: Activity,
      },
    ]
  },
  {
    title: "Báo cáo & Thống kê",
    items: [
      {
        title: "Phân tích hiệu suất",
        url: "/reports/analytics",
        icon: BarChart3,
      },
      {
        title: "Tạo báo cáo tùy chỉnh",
        url: "/reports/custom",
        icon: FileText,
      },
    ]
  },
  {
    title: "Thông báo khẩn cấp",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Cấu hình hệ thống",
    url: "/system-config",
    icon: Settings,
  },
  {
    title: "Quản lý dữ liệu",
    items: [
      {
        title: "Sao lưu & Khôi phục",
        url: "/data/backup",
        icon: Database,
      },
      {
        title: "Import dữ liệu",
        url: "/data/import",
        icon: Upload,
      },
      {
        title: "Export dữ liệu",
        url: "/data/export",
        icon: Download,
      },
    ]
  },
]

export function AdminSidebar() {
  const location = useLocation()

  const handleLogout = () => {
    // Add logout logic here
    console.log("Đăng xuất")
    // You can add actual logout functionality here
  }

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">BA</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm">Blood Admin</h2>
            <p className="text-xs text-muted-foreground">Hệ thống quản lý</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        {menuItems.map((section, index) => (
          <SidebarGroup key={index}>
            {section.items ? (
              <>
                <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2 mb-2">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={location.pathname === item.url}
                          className="w-full"
                        >
                          <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            ) : (
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === section.url}
                      className="w-full"
                    >
                      <a href={section.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                        <section.icon className="w-4 h-4" />
                        <span className="text-sm">{section.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="space-y-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-50 hover:text-red-600 text-red-500"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Hệ thống hoạt động bình thường</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
