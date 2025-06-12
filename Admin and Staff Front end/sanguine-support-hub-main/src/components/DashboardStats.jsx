
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Droplets, Activity, AlertTriangle } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Tổng người dùng",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "So với tháng trước"
    },
    {
      title: "Đơn vị máu hiện có", 
      value: "1,234",
      change: "-5%",
      changeType: "negative",
      icon: Droplets,
      description: "Cần bổ sung thêm"
    },
    {
      title: "Hoạt động hiến máu",
      value: "89",
      change: "+23%", 
      changeType: "positive",
      icon: Activity,
      description: "Trong tuần này"
    },
    {
      title: "Cảnh báo thiếu máu",
      value: "7",
      change: "+2",
      changeType: "warning",
      icon: AlertTriangle,
      description: "Nhóm máu thiếu"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className={`font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {stat.change}
              </span>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
