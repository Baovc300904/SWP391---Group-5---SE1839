
import React from 'react';
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
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  MessageCircle, 
  FileText, 
  Droplets, 
  BarChart3, 
  Bell,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý người dùng",
    url: "/users",
    icon: Users,
  },
  {
    title: "Hoạt động hiến máu",
    url: "/activities",
    icon: Activity,
  },
  {
    title: "Hỗ trợ người dùng",
    url: "/support",
    icon: MessageCircle,
  },
  {
    title: "Quản lý blog",
    url: "/blogs",
    icon: FileText,
  },
  {
    title: "Kho máu",
    url: "/inventory",
    icon: Droplets,
  },
  {
    title: "Báo cáo & Thống kê",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Thông báo hệ thống",
    url: "/notifications",
    icon: Bell,
  },
];

const StaffSidebar = () => {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Droplets className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Blood Management</h2>
            <p className="text-xs text-muted-foreground">Staff Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu chính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@bloodbank.com</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default StaffSidebar;
