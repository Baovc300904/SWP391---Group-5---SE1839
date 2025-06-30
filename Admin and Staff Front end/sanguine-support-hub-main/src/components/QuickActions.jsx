
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus, FileText, Bell, Download, Upload } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "Thêm người dùng mới",
      description: "Đăng ký tài khoản cho người hiến máu",
      icon: UserPlus,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Tạo hoạt động hiến máu",
      description: "Lên lịch sự kiện hiến máu mới",
      icon: Plus,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Tạo blog mới",
      description: "Viết bài viết thông tin y tế",
      icon: FileText,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Gửi thông báo",
      description: "Thông báo đến người dùng hệ thống",
      icon: Bell,
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Xuất báo cáo",
      description: "Tải xuống báo cáo thống kê",
      icon: Download,
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Nhập dữ liệu",
      description: "Import dữ liệu từ Excel/CSV",
      icon: Upload,
      color: "bg-pink-500 hover:bg-pink-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thao tác nhanh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start text-left hover:bg-muted/50"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-2 rounded-md ${action.color} text-white`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">{action.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
