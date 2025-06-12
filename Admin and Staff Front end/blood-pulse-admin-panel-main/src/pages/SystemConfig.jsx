
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Save,
  RotateCcw,
  Globe,
  Shield,
  Clock
} from "lucide-react"

const SystemConfig = () => {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cấu hình hệ thống</h1>
            <p className="text-muted-foreground">Quản lý các thông số và cài đặt toàn cục</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </div>

        {/* Donation Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quy định hiến máu
            </CardTitle>
            <CardDescription>
              Thiết lập các thông số an toàn cho quá trình hiến máu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="min-interval">Thời gian tối thiểu giữa các lần hiến (ngày)</Label>
                <Input id="min-interval" type="number" defaultValue="56" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-age">Tuổi tối thiểu</Label>
                <Input id="min-age" type="number" defaultValue="18" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-age">Tuổi tối đa</Label>
                <Input id="max-age" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-weight">Cân nặng tối thiểu (kg)</Label>
                <Input id="min-weight" type="number" defaultValue="45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-height">Chiều cao tối thiểu (cm)</Label>
                <Input id="min-height" type="number" defaultValue="150" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donation-amount">Lượng máu hiến mỗi lần (ml)</Label>
                <Input id="donation-amount" type="number" defaultValue="350" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blood Storage Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Quy định bảo quản máu
            </CardTitle>
            <CardDescription>
              Cấu hình các thông số bảo quản và sử dụng máu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="storage-temp">Nhiệt độ bảo quản (°C)</Label>
                <Input id="storage-temp" defaultValue="2-6" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shelf-life">Thời hạn sử dụng (ngày)</Label>
                <Input id="shelf-life" type="number" defaultValue="35" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stock">Mức tồn kho tối thiểu (đơn vị)</Label>
                <Input id="min-stock" type="number" defaultValue="50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-stock">Mức tồn kho tối đa (đơn vị)</Label>
                <Input id="max-stock" type="number" defaultValue="500" />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Cài đặt cảnh báo</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cảnh báo khi máu sắp hết hạn</Label>
                    <p className="text-sm text-muted-foreground">Thông báo trước 3 ngày</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cảnh báo thiếu máu</Label>
                    <p className="text-sm text-muted-foreground">Khi dưới mức tối thiểu</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cảnh báo nhiệt độ</Label>
                    <p className="text-sm text-muted-foreground">Khi vượt quá ngưỡng an toàn</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Thông tin trang chủ
            </CardTitle>
            <CardDescription>
              Cấu hình nội dung hiển thị trên trang chủ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="site-title">Tiêu đề trang web</Label>
              <Input id="site-title" defaultValue="Ngân hàng máu quốc gia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Mô tả</Label>
              <Textarea 
                id="site-description" 
                defaultValue="Hệ thống quản lý ngân hàng máu hiện đại, an toàn và hiệu quả"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-info">Thông tin liên hệ</Label>
              <Textarea 
                id="contact-info" 
                defaultValue="Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh&#10;Điện thoại: 028-1234-5678&#10;Email: info@bloodbank.gov.vn"
                rows={4}
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Cài đặt hiển thị</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Hiển thị số liệu thống kê</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Hiển thị lịch hiến máu</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Hiển thị tin tức</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Chế độ bảo trì</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Cài đặt bảo mật
            </CardTitle>
            <CardDescription>
              Cấu hình các thông số bảo mật hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Thời gian hết phiên (phút)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-attempts">Số lần đăng nhập sai tối đa</Label>
                <Input id="max-attempts" type="number" defaultValue="5" />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Chính sách mật khẩu</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Yêu cầu chữ hoa</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Yêu cầu chữ số</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Yêu cầu ký tự đặc biệt</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Độ dài tối thiểu: 8 ký tự</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default SystemConfig
