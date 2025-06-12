
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  Droplets
} from "lucide-react"

const Reports = () => {
  const reportTemplates = [
    {
      name: "Báo cáo hiệu suất tuần",
      description: "Thống kê hoạt động và hiệu quả trong tuần",
      type: "PDF",
      lastGenerated: "2 ngày trước",
      status: "ready"
    },
    {
      name: "Báo cáo tồn kho máu",
      description: "Tình trạng kho máu theo nhóm và thời gian",
      type: "Excel", 
      lastGenerated: "1 ngày trước",
      status: "ready"
    },
    {
      name: "Báo cáo hoạt động nhân viên",
      description: "Chi tiết các hoạt động của nhân viên",
      type: "Word",
      lastGenerated: "3 giờ trước", 
      status: "generating"
    }
  ]

  const analytics = [
    {
      title: "Tổng số người hiến máu",
      value: "2,847",
      change: "+15.2%",
      period: "So với tháng trước",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Đơn vị máu thu được",
      value: "1,234",
      change: "+8.7%", 
      period: "So với tháng trước",
      icon: Droplets,
      color: "text-red-600"
    },
    {
      title: "Tỷ lệ thành công",
      value: "94.2%",
      change: "+2.1%",
      period: "So với tháng trước", 
      icon: TrendingUp,
      color: "text-green-600"
    }
  ]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Báo cáo & Thống kê</h1>
            <p className="text-muted-foreground">Phân tích dữ liệu và tạo báo cáo tùy chỉnh</p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Tạo báo cáo mới
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analytics.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                  <span>{stat.change} {stat.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Mẫu báo cáo có sẵn
            </CardTitle>
            <CardDescription>
              Các mẫu báo cáo đã được cấu hình sẵn để sử dụng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{report.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Tạo lần cuối: {report.lastGenerated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "ready" ? (
                      <Badge className="bg-green-100 text-green-800">Sẵn sàng</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">Đang tạo</Badge>
                    )}
                    <Button variant="outline" size="sm" disabled={report.status !== "ready"}>
                      <Download className="w-4 h-4 mr-2" />
                      Tải xuống
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Lên lịch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Report Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Tạo báo cáo tùy chỉnh</CardTitle>
            <CardDescription>
              Xây dựng báo cáo theo yêu cầu riêng với dữ liệu tùy chọn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-medium">Biểu đồ</h4>
                  <p className="text-xs text-muted-foreground">Tạo biểu đồ thống kê</p>
                </div>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-medium">Bảng dữ liệu</h4>
                  <p className="text-xs text-muted-foreground">Tạo bảng chi tiết</p>
                </div>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <div className="text-center">
                  <Download className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-medium">Excel Export</h4>
                  <p className="text-xs text-muted-foreground">Xuất dữ liệu Excel</p>
                </div>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-medium">Word Report</h4>
                  <p className="text-xs text-muted-foreground">Tạo báo cáo Word</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default Reports
