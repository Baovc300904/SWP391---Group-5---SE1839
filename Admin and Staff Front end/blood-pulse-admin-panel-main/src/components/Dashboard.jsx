
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Droplets, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Bell
} from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Tổng nhân viên",
      value: "248",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Đơn vị máu trong kho",
      value: "1,847",
      change: "-5%",
      trend: "down",
      icon: Droplets,
      color: "text-red-600"
    },
    {
      title: "Hoạt động hôm nay",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: Activity,
      color: "text-green-600"
    },
    {
      title: "Cảnh báo khẩn cấp",
      value: "3",
      change: "0",
      trend: "neutral",
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ]

  const bloodInventory = [
    { type: "A+", units: 245, status: "normal" },
    { type: "A-", units: 89, status: "low" },
    { type: "B+", units: 156, status: "normal" },
    { type: "B-", units: 67, status: "critical" },
    { type: "AB+", units: 78, status: "low" },
    { type: "AB-", units: 34, status: "critical" },
    { type: "O+", units: 298, status: "normal" },
    { type: "O-", units: 123, status: "normal" }
  ]

  const recentActivities = [
    {
      user: "Nguyễn Văn A",
      action: "Thêm người hiến máu mới",
      time: "5 phút trước",
      type: "create"
    },
    {
      user: "Trần Thị B",
      action: "Cập nhật thông tin kho máu",
      time: "15 phút trước", 
      type: "update"
    },
    {
      user: "Lê Văn C",
      action: "Xuất báo cáo tuần",
      time: "30 phút trước",
      type: "export"
    },
    {
      user: "Phạm Thị D",
      action: "Phê duyệt yêu cầu máu khẩn cấp",
      time: "1 giờ trước",
      type: "approve"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800"
      case "low": return "bg-yellow-100 text-yellow-800"
      case "critical": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "normal": return "Bình thường"
      case "low": return "Thấp"
      case "critical": return "Nguy cấp"
      default: return "Không xác định"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Tổng quan hệ thống ngân hàng máu</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Hôm nay
          </Button>
          <Button size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Thông báo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" && <TrendingUp className="w-3 h-3 mr-1 text-green-600" />}
                {stat.trend === "down" && <TrendingUp className="w-3 h-3 mr-1 text-red-600 rotate-180" />}
                <span>{stat.change} so với tuần trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blood Inventory and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-red-600" />
              Tồn kho máu theo nhóm
            </CardTitle>
            <CardDescription>
              Tình trạng hiện tại của các nhóm máu trong kho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {bloodInventory.map((blood, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-semibold text-sm">{blood.type}</span>
                    </div>
                    <div>
                      <p className="font-medium">{blood.units} đơn vị</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(blood.status)}>
                    {getStatusText(blood.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Hoạt động gần đây
            </CardTitle>
            <CardDescription>
              Các thao tác mới nhất trong hệ thống
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

      {/* Emergency Alerts */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            Cảnh báo khẩn cấp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Nhóm máu B- dưới mức tối thiểu</p>
                <p className="text-sm text-red-600">Chỉ còn 67 đơn vị, cần bổ sung khẩn cấp</p>
              </div>
              <Button variant="destructive" size="sm">
                Xử lý ngay
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Nhóm máu AB- dưới mức tối thiểu</p>
                <p className="text-sm text-red-600">Chỉ còn 34 đơn vị, cần bổ sung khẩn cấp</p>
              </div>
              <Button variant="destructive" size="sm">
                Xử lý ngay
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
