
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import StaffSidebar from "@/components/StaffSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertTriangle, CheckCircle } from "lucide-react";

const Inventory = () => {
  const bloodTypes = [
    { type: "O+", units: 45, status: "normal", expiringSoon: 5 },
    { type: "O-", units: 12, status: "low", expiringSoon: 2 },
    { type: "A+", units: 38, status: "normal", expiringSoon: 8 },
    { type: "A-", units: 8, status: "critical", expiringSoon: 1 },
    { type: "B+", units: 25, status: "normal", expiringSoon: 4 },
    { type: "B-", units: 6, status: "low", expiringSoon: 0 },
    { type: "AB+", units: 15, status: "normal", expiringSoon: 3 },
    { type: "AB-", units: 3, status: "critical", expiringSoon: 1 }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Bình thường</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800">Thấp</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Nguy hiểm</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'low':
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const totalUnits = bloodTypes.reduce((sum, blood) => sum + blood.units, 0);
  const criticalTypes = bloodTypes.filter(blood => blood.status === 'critical').length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StaffSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Kho máu</h1>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nhập máu mới
              </Button>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      ♥
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng đơn vị máu</p>
                      <p className="text-2xl font-bold">{totalUnits}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nhóm máu nguy hiểm</p>
                      <p className="text-2xl font-bold">{criticalTypes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                      EXP
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sắp hết hạn</p>
                      <p className="text-2xl font-bold">
                        {bloodTypes.reduce((sum, blood) => sum + blood.expiringSoon, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blood Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Tồn kho theo nhóm máu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bloodTypes.map((blood) => (
                    <div key={blood.type} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                            {blood.type}
                          </div>
                          {getStatusIcon(blood.status)}
                        </div>
                        {getStatusBadge(blood.status)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{blood.units} đơn vị</p>
                        <p className="text-sm text-muted-foreground">
                          {blood.expiringSoon} đơn vị sắp hết hạn
                        </p>
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

export default Inventory;
