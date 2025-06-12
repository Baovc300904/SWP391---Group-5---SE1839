
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import DashboardStats from "@/components/DashboardStats";
import BloodTypeChart from "@/components/BloodTypeChart";
import RecentActivities from "@/components/RecentActivities";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Dashboard Quản lý Hiến Máu</h1>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Xin chào, Staff</span>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Stats Overview */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Tổng quan</h2>
              <DashboardStats />
            </section>

            {/* Charts and Activities */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BloodTypeChart />
              <QuickActions />
            </section>

            {/* Recent Activities */}
            <section>
              <RecentActivities />
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
