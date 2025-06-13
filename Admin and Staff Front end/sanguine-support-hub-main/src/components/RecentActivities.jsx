
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      action: "Hiến máu",
      bloodType: "O+",
      amount: "450ml",
      time: "2 giờ trước",
      status: "Hoàn thành",
      avatar: "NA"
    },
    {
      id: 2,
      user: "Trần Thị B", 
      action: "Yêu cầu máu",
      bloodType: "AB-",
      amount: "300ml",
      time: "4 giờ trước",
      status: "Đang xử lý",
      avatar: "TB"
    },
    {
      id: 3,
      user: "Lê Văn C",
      action: "Hiến máu",
      bloodType: "A+",
      amount: "450ml", 
      time: "6 giờ trước",
      status: "Hoàn thành",
      avatar: "LC"
    },
    {
      id: 4,
      user: "Phạm Thị D",
      action: "Yêu cầu máu",
      bloodType: "B+",
      amount: "200ml",
      time: "8 giờ trước", 
      status: "Đã duyệt",
      avatar: "PD"
    },
    {
      id: 5,
      user: "Hoàng Văn E",
      action: "Hiến máu",
      bloodType: "O-",
      amount: "450ml",
      time: "1 ngày trước",
      status: "Hoàn thành", 
      avatar: "HE"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang xử lý': 
        return 'bg-yellow-100 text-yellow-800';
      case 'Đã duyệt':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.action} • {activity.bloodType} • {activity.amount}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
