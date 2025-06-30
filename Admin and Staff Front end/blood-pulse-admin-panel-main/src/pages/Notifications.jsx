
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Bell, 
  AlertTriangle, 
  Settings,
  Plus
} from "lucide-react"

const Notifications = () => {
  const emergencyAlerts = [
    {
      id: 1,
      type: "critical",
      message: "Nhóm máu O- dưới mức tối thiểu (25 đơn vị)",
      time: "5 phút trước",
      handled: false
    },
    {
      id: 2,
      type: "warning",
      message: "Nhóm máu AB+ sắp hết hạn (50 đơn vị trong 3 ngày)",
      time: "1 giờ trước",
      handled: false
    },
    {
      id: 3,
      type: "info",
      message: "Lịch hiến máu định kỳ vào tuần tới",
      time: "2 giờ trước",
      handled: true
    }
  ]

  const notificationRules = [
    {
      name: "Cảnh báo thiếu máu",
      description: "Thông báo khi số lượng máu dưới mức tối thiểu",
      enabled: true,
      threshold: "50 đơn vị"
    },
    {
      name: "Máu sắp hết hạn",
      description: "Cảnh báo khi máu sắp hết hạn sử dụng",
      enabled: true,
      threshold: "3 ngày"
    },
    {
      name: "Hoạt động bất thường",
      description: "Thông báo về các hoạt động đáng ngờ",
      enabled: false,
      threshold: "N/A"
    }
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Thông báo khẩn cấp</h1>
            <p className="text-muted-foreground">Quản lý và cấu hình hệ thống thông báo</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo thông báo
          </Button>
        </div>

        {/* Emergency Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Cảnh báo khẩn cấp
            </CardTitle>
            <CardDescription>
              Các thông báo cần xử lý ngay lập tức
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${
                  alert.type === "critical" ? "border-red-200 bg-red-50" :
                  alert.type === "warning" ? "border-yellow-200 bg-yellow-50" :
                  "border-blue-200 bg-blue-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.type === "critical" ? "bg-red-500" :
                        alert.type === "warning" ? "bg-yellow-500" :
                        "bg-blue-500"
                      }`}></div>
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {alert.handled ? (
                        <Badge className="bg-green-100 text-green-800">Đã xử lý</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Chưa xử lý</Badge>
                      )}
                      {!alert.handled && (
                        <Button variant="outline" size="sm">
                          Xử lý
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quy tắc thông báo
            </CardTitle>
            <CardDescription>
              Cấu hình điều kiện và ngưỡng cho các thông báo tự động
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notificationRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{rule.name}</h3>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ngưỡng: {rule.threshold}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={rule.enabled} />
                    <Button variant="outline" size="sm">
                      Cấu hình
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Cài đặt thông báo
            </CardTitle>
            <CardDescription>
              Tùy chỉnh cách thức gửi và hiển thị thông báo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Kênh thông báo</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push notification</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack</span>
                    <Switch />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Tần suất thông báo</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Thông báo ngay lập tức</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tóm tắt hàng giờ</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Báo cáo hàng ngày</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chỉ trong giờ làm việc</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default Notifications
