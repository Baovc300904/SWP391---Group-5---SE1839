
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Plus } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Ngày hiến máu cộng đồng",
      date: "2024-06-15",
      location: "Trung tâm Y tế Quận 1",
      participants: 45,
      status: "upcoming",
      bloodCollected: 0
    },
    {
      id: 2,
      title: "Hiến máu tại trường ĐH",
      date: "2024-06-08",
      location: "Đại học Bách Khoa",
      participants: 120,
      status: "completed",
      bloodCollected: 85
    },
    {
      id: 3,
      title: "Chiến dịch hiến máu khẩn cấp",
      date: "2024-06-20",
      location: "Bệnh viện Chợ Rẫy",
      participants: 0,
      status: "planning",
      bloodCollected: 0
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Sắp diễn ra</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case 'planning':
        return <Badge className="bg-yellow-100 text-yellow-800">Đang lên kế hoạch</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Hoạt động hiến máu</h1>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tạo hoạt động mới
              </Button>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hoạt động trong tháng</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Người tham gia</p>
                      <p className="text-2xl font-bold">256</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      ♥
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Đơn vị máu thu được</p>
                      <p className="text-2xl font-bold">185</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities List */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách hoạt động</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium">{activity.title}</h3>
                            {getStatusBadge(activity.status)}
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(activity.date).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{activity.participants} người tham gia</span>
                            </div>
                            {activity.bloodCollected > 0 && (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span>{activity.bloodCollected} đơn vị máu</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Xem chi tiết
                          </Button>
                          <Button variant="outline" size="sm">
                            Chỉnh sửa
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

export default Activities;
