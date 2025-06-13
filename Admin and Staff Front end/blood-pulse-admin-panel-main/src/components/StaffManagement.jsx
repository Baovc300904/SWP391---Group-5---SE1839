
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Shield, 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Eye
} from "lucide-react"

const StaffManagement = () => {
  const staffList = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@bloodbank.vn",
      role: "Admin",
      permissions: ["Toàn quyền"],
      status: "active",
      lastActive: "2 phút trước"
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      email: "binh.tran@bloodbank.vn", 
      role: "Staff",
      permissions: ["Xem dữ liệu", "Phê duyệt yêu cầu"],
      status: "active",
      lastActive: "15 phút trước"
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      email: "cuong.le@bloodbank.vn",
      role: "Viewer",
      permissions: ["Chỉ xem"],
      status: "inactive",
      lastActive: "2 ngày trước"
    }
  ]

  const roles = [
    {
      name: "Admin",
      description: "Toàn quyền quản lý hệ thống",
      permissions: [
        "Quản lý nhân viên",
        "Cấu hình hệ thống", 
        "Xem báo cáo",
        "Quản lý dữ liệu",
        "Thông báo khẩn cấp"
      ],
      userCount: 2
    },
    {
      name: "Staff",
      description: "Nhân viên vận hành",
      permissions: [
        "Xem dữ liệu người dùng",
        "Phê duyệt yêu cầu",
        "Cập nhật kho máu",
        "Tạo báo cáo cơ bản"
      ],
      userCount: 15
    },
    {
      name: "Viewer",
      description: "Chỉ xem thông tin",
      permissions: [
        "Xem dashboard",
        "Xem báo cáo",
        "Xem thống kê"
      ],
      userCount: 8
    }
  ]

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800"
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800"
      case "Staff": return "bg-blue-100 text-blue-800"
      case "Viewer": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
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

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Danh sách nhân viên
          </CardTitle>
          <CardDescription>
            Quản lý thông tin và quyền hạn của từng nhân viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Tìm kiếm nhân viên..." className="pl-10" />
            </div>
            <Button variant="outline">
              Lọc theo vai trò
            </Button>
          </div>

          <div className="space-y-4">
            {staffList.map((staff) => (
              <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff.email}</p>
                    <div className="flex gap-2 mt-1">
                      {staff.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={getRoleColor(staff.role)}>
                      {staff.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{staff.lastActive}</p>
                  </div>
                  <Badge className={getStatusColor(staff.status)}>
                    {staff.status === "active" ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Quản lý vai trò
          </CardTitle>
          <CardDescription>
            Cấu hình quyền hạn cho các vai trò khác nhau
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge variant="secondary">{role.userCount} người</Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Quyền hạn:</h4>
                    <ul className="space-y-1">
                      {role.permissions.map((permission, permIndex) => (
                        <li key={permIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Chỉnh sửa vai trò
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StaffManagement
