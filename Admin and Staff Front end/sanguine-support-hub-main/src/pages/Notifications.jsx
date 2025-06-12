
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, AlertTriangle, Info, CheckCircle } from "lucide-react";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Kho máu O- đang cạn kiệt",
      message: "Chỉ còn 8 đơn vị máu O- trong kho. Cần tổ chức chiến dịch hiến máu khẩn cấp.",
      type: "critical",
      timestamp: "2024-06-09 10:30",
      isRead: false
    },
    {
      id: 2,
      title: "Hoạt động hiến máu hoàn thành",
      message: "Chiến dịch hiến máu tại Đại học Bách Khoa đã hoàn thành với 120 người tham gia.",
      type: "success",
      timestamp: "2024-06-08 16:45",
      isRead: true
    },
    {
      id: 3,
      title: "Người dùng mới đăng ký",
      message: "5 người dùng mới đã đăng ký trong hệ thống trong 24h qua.",
      type: "info",
      timestamp: "2024-06-08 09:15",
      isRead: false
    },
    {
      id: 4,
      title: "Báo cáo tháng đã sẵn sàng",
      message: "Báo cáo hoạt động hiến máu tháng 5 đã được tạo và sẵn sàng để xem.",
      type: "info",
      timestamp: "2024-06-07 14:20",
      isRead: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type) => {
    switch (type) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Khẩn cấp</Badge>;
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Thành công</Badge>;
      case 'info':
      default:
        return <Badge className="bg-blue-100 text-blue-800">Thông tin</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Thông báo hệ thống</h1>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tạo thông báo
              </Button>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Notification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng thông báo</p>
                      <p className="text-2xl font-bold">{notifications.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{unreadCount}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Chưa đọc</p>
                      <p className="text-2xl font-bold">{unreadCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Khẩn cấp</p>
                      <p className="text-2xl font-bold">
                        {notifications.filter(n => n.type === 'critical').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications List */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách thông báo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg ${!notification.isRead ? 'bg-blue-50 border-blue-200' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              {getNotificationBadge(notification.type)}
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!notification.isRead && (
                            <Button variant="outline" size="sm">
                              Đánh dấu đã đọc
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Xóa
                          </Button>
                        </div>
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

export default Notifications;
