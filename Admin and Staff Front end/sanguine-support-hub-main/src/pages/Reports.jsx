
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Báo cáo hiến máu tháng",
      type: "monthly",
      description: "Thống kê số lượng người hiến máu và đơn vị máu thu được trong tháng",
      lastGenerated: "2024-06-01"
    },
    {
      id: 2,
      title: "Báo cáo tồn kho",
      type: "inventory",
      description: "Tình trạng tồn kho máu theo từng nhóm máu",
      lastGenerated: "2024-06-08"
    },
    {
      id: 3,
      title: "Báo cáo hoạt động",
      type: "activities",
      description: "Tổng hợp các hoạt động hiến máu đã tổ chức",
      lastGenerated: "2024-06-05"
    }
  ];

  const stats = [
    {
      title: "Tổng người hiến máu",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users
    },
    {
      title: "Đơn vị máu thu được",
      value: "856",
      change: "+8%",
      trend: "up",
      icon: Activity
    },
    {
      title: "Hoạt động tổ chức",
      value: "24",
      change: "+15%",
      trend: "up",
      icon: BarChart3
    },
    {
      title: "Tỷ lệ thành công",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: TrendingUp
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Báo cáo & Thống kê</h1>
              </div>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                Tạo báo cáo mới
              </Button>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} so với tháng trước</p>
                      </div>
                      <stat.icon className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reports List */}
            <Card>
              <CardHeader>
                <CardTitle>Báo cáo có sẵn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Tạo lần cuối: {new Date(report.lastGenerated).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Xem báo cáo
                        </Button>
                        <Button variant="outline" size="sm">
                          Tải xuống
                        </Button>
                        <Button size="sm">
                          Tạo mới
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Reports;
