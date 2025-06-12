
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Support = () => {
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  const tickets = [
    {
      id: 1,
      title: "Không thể đăng ký hiến máu",
      description: "Tôi gặp lỗi khi đăng ký tham gia hoạt động hiến máu",
      user: "Nguyễn Văn A",
      status: "open",
      priority: "high",
      createdAt: "2024-06-08 14:30"
    },
    {
      id: 2,
      title: "Câu hỏi về điều kiện hiến máu",
      description: "Tôi muốn biết điều kiện để có thể hiến máu",
      user: "Trần Thị B",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-06-08 10:15"
    },
    {
      id: 3,
      title: "Cập nhật thông tin cá nhân",
      description: "Làm thế nào để thay đổi số điện thoại trong hồ sơ?",
      user: "Lê Minh C",
      status: "resolved",
      priority: "low",
      createdAt: "2024-06-07 16:45"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-red-100 text-red-800">Mở</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800">Đang xử lý</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Đã giải quyết</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Cao</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case 'low':
        return <Badge variant="secondary">Thấp</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
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
                <h1 className="text-lg font-semibold">Hỗ trợ người dùng</h1>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket mở</p>
                      <p className="text-xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Đang xử lý</p>
                      <p className="text-xl font-bold">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Đã giải quyết</p>
                      <p className="text-xl font-bold">45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng ticket</p>
                      <p className="text-xl font-bold">65</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Support Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách yêu cầu hỗ trợ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(ticket.status)}
                          <h3 className="font-medium">{ticket.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Người gửi: {ticket.user}</span>
                        <span>{ticket.createdAt}</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                        <Button variant="outline" size="sm">
                          Trả lời
                        </Button>
                        {ticket.status !== 'resolved' && (
                          <Button variant="outline" size="sm">
                            Đánh dấu đã giải quyết
                          </Button>
                        )}
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

export default Support;
