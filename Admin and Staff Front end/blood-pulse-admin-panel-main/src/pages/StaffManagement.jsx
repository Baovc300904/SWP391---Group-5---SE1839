
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Shield, 
  Activity, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2
} from "lucide-react"

const StaffManagement = () => {
  const staffList = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      role: "Admin",
      permissions: ["Toàn quyền"],
      lastActivity: "2 phút trước",
      status: "online"
    },
    {
      id: 2,
      name: "Trần Thị B",
      role: "Staff",
      permissions: ["Xem dữ liệu", "Phê duyệt yêu cầu"],
      lastActivity: "15 phút trước",
      status: "offline"
    },
    {
      id: 3,
      name: "Lê Văn C",
      role: "Staff",
      permissions: ["Xem dữ liệu"],
      lastActivity: "1 giờ trước",
      status: "online"
    }
  ]

  const recentActivities = [
    {
      user: "Nguyễn Văn A",
      action: "Thêm nhân viên mới",
      time: "5 phút trước",
      type: "create"
    },
    {
      user: "Trần Thị B",
      action: "Cập nhật quyền hạn cho Lê Văn C",
      time: "1 giờ trước",
      type: "update"
    },
    {
      user: "Lê Văn C",
      action: "Đăng nhập vào hệ thống",
      time: "2 giờ trước",
      type: "login"
    }
  ]

  const roles = [
    {
      name: "Admin",
      description: "Toàn quyền quản lý hệ thống",
      permissions: ["Toàn quyền"],
      count: 1
    },
    {
      name: "Staff",
      description: "Nhân viên quản lý dữ liệu",
      permissions: ["Xem dữ liệu", "Phê duyệt yêu cầu", "Tạo báo cáo"],
      count: 15
    },
    {
      name: "Viewer",
      description: "Chỉ xem dữ liệu",
      permissions: ["Xem dữ liệu"],
      count: 32
    }
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý nhân viên</h1>
            <p className="text-muted-foreground">Phân quyền và theo dõi hoạt động nhân viên</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm nhân viên
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng nhân viên
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+2 từ tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Đang online
              </CardTitle>
              <Activity className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">25% tổng nhân viên</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vai trò
              </CardTitle>
              <Shield className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Admin, Staff, Viewer</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Danh sách nhân viên
              </CardTitle>
              <CardDescription>
                Quản lý thông tin và quyền hạn nhân viên
              </CardDescription>
              <div className="flex gap-2">
                <Input placeholder="Tìm kiếm nhân viên..." className="flex-1" />
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffList.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-xs">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={staff.role === "Admin" ? "default" : "secondary"}>
                            {staff.role}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${staff.status === "online" ? "bg-green-500" : "bg-gray-400"}`}></div>
                          <span className="text-xs text-muted-foreground">{staff.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Hoạt động gần đây
              </CardTitle>
              <CardDescription>
                Theo dõi các thao tác của nhân viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Quản lý vai trò
            </CardTitle>
            <CardDescription>
              Cấu hình quyền hạn cho từng vai trò
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{role.name}</h3>
                    <Badge variant="outline">{role.count} người</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                  <div className="space-y-1">
                    {role.permissions.map((permission, pIndex) => (
                      <div key={pIndex} className="text-xs bg-muted px-2 py-1 rounded">
                        {permission}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Chỉnh sửa quyền
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default StaffManagement
