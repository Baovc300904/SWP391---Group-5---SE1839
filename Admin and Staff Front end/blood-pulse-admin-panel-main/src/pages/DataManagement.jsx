
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Database, 
  Download, 
  Upload,
  Archive,
  RefreshCw,
  FileText,
  AlertCircle
} from "lucide-react"

const DataManagement = () => {
  const backupHistory = [
    {
      id: 1,
      name: "backup_2024_01_15.sql",
      size: "2.4 GB",
      date: "15/01/2024 14:30",
      status: "completed",
      type: "full"
    },
    {
      id: 2,
      name: "backup_2024_01_14.sql",
      size: "2.1 GB", 
      date: "14/01/2024 14:30",
      status: "completed",
      type: "incremental"
    },
    {
      id: 3,
      name: "backup_2024_01_13.sql",
      size: "350 MB",
      date: "13/01/2024 14:30",
      status: "failed",
      type: "incremental"
    }
  ]

  const importExportLogs = [
    {
      id: 1,
      action: "Import",
      file: "donors_january_2024.xlsx",
      records: 1250,
      status: "success",
      date: "2 giờ trước"
    },
    {
      id: 2,
      action: "Export", 
      file: "blood_inventory_report.pdf",
      records: 3400,
      status: "success",
      date: "1 ngày trước"
    },
    {
      id: 3,
      action: "Import",
      file: "staff_data.csv",
      records: 45,
      status: "error",
      date: "2 ngày trước"
    }
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý dữ liệu</h1>
            <p className="text-muted-foreground">Sao lưu, khôi phục và quản lý dữ liệu hệ thống</p>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Trạng thái hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.4 GB</div>
                <p className="text-sm text-muted-foreground">Dung lượng cơ sở dữ liệu</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <p className="text-sm text-muted-foreground">Uptime hệ thống</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">156,234</div>
                <p className="text-sm text-muted-foreground">Tổng số bản ghi</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">15/01/2024</div>
                <p className="text-sm text-muted-foreground">Backup gần nhất</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Backup & Recovery */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5" />
                Sao lưu & Khôi phục
              </CardTitle>
              <CardDescription>
                Quản lý việc sao lưu và khôi phục dữ liệu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Archive className="w-4 h-4 mr-2" />
                  Tạo backup ngay
                </Button>
                <Button variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Khôi phục
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Lịch sử backup</h4>
                {backupHistory.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{backup.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{backup.size}</span>
                        <span>•</span>
                        <span>{backup.date}</span>
                        <Badge variant={backup.type === "full" ? "default" : "secondary"}>
                          {backup.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {backup.status === "completed" ? (
                        <Badge className="bg-green-100 text-green-800">Thành công</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Thất bại</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Import/Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Import / Export dữ liệu
              </CardTitle>
              <CardDescription>
                Nhập và xuất dữ liệu từ các nguồn bên ngoài
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Excel
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Lịch sử Import/Export</h4>
                {importExportLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={log.action === "Import" ? "secondary" : "outline"}>
                          {log.action}
                        </Badge>
                        <span className="font-medium text-sm">{log.file}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{log.records} bản ghi</span>
                        <span>•</span>
                        <span>{log.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {log.status === "success" ? (
                        <Badge className="bg-green-100 text-green-800">Thành công</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Lỗi</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Integrity Check */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Kiểm tra tính toàn vẹn dữ liệu
            </CardTitle>
            <CardDescription>
              Phát hiện và sửa chữa các vấn đề về dữ liệu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Kiểm tra tính nhất quán</h4>
                  <p className="text-sm text-muted-foreground">Xác minh mối quan hệ giữa các bảng dữ liệu</p>
                </div>
                <Button variant="outline">
                  Chạy kiểm tra
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kiểm tra khóa ngoại</span>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="w-24" />
                    <Badge className="bg-green-100 text-green-800">OK</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kiểm tra dữ liệu trùng lặp</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-24" />
                    <Badge className="bg-yellow-100 text-yellow-800">Cảnh báo</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kiểm tra format dữ liệu</span>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="w-24" />
                    <Badge className="bg-green-100 text-green-800">OK</Badge>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Phát hiện 12 bản ghi trùng lặp</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Có 12 người hiến máu có thông tin giống nhau. Bạn có muốn xem chi tiết và xử lý không?
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default DataManagement
