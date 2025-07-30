// Import moment để xử lý định dạng ngày
import moment from "moment";
import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Spin,
  Tag,
  Typography,
  Row,
  Col,
  Table,
  Avatar,
  Card,
  Space,
  Progress,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCampaignDetail } from "../../services/campaignService";
import { donateBloodRequest } from "../../services/donationService";
import { 
  UserOutlined, 
  HeartOutlined, 
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  SafetyOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const statusColor = {
  dangcho: "gold",
  tuchoi: "red",
  huy: "gray",
  xacnhan: "blue",
  dahien: "green",
};

const statusText = {
  dangcho: "Đang chờ",
  tuchoi: "Từ chối",
  huy: "Hủy",
  xacnhan: "Xác nhận",
  dahien: "Đã hiến",
};

// Hàm kiểm tra khoảng cách theo loại hiến máu
const validateDateDifference = (recoveryDate, donationDate, donationType) => {
  if (!recoveryDate || !donationDate) return true;

  // Thời gian hiến lại theo loại hiến máu (đơn vị: tuần)
  const requiredWeeks = {
    toanphan: 12, // 12 tuần
    hongcau: 16, // 16 tuần
    tieucau: 2, // 2 tuần
    huyettuong: 2, // 2 tuần
  };
  const required = requiredWeeks[donationType] || 12; // Mặc định 12 tuần

  // Chuyển đổi số tuần yêu cầu thành số ngày
  const requiredDays = required * 7;

  // Tính số ngày chênh lệch giữa hai ngày
  const diffInDays = Math.abs(donationDate.diff(recoveryDate, "days"));

  // So sánh số ngày chênh lệch với số ngày yêu cầu
  return diffInDays >= requiredDays;
};

// Hàm lấy thời gian hiến lại theo loại hiến máu
const getRequiredWeeks = (donationType) => {
  const requiredWeeks = {
    toanphan: 12, // 12 tuần (3 tháng)
    hongcau: 16, // 16 tuần (4 tháng)
    tieucau: 2, // 2 tuần
    huyettuong: 2, // 2 tuần
  };
  return requiredWeeks[donationType] || 12;
};

// Hàm lấy tên loại hiến máu
const getDonationTypeName = (donationType) => {
  const typeNames = {
    toanphan: "Toàn Phần",
    hongcau: "Hồng Cầu",
    tieucau: "Tiểu Cầu",
    huyettuong: "Huyết Tương",
  };
  return typeNames[donationType] || "Toàn Phần";
};

// Custom validator cho ngày hiến máu dự kiến
const createDonationDateValidator = (form) => (_, value) => {
  const recoveryDate = form.getFieldValue("ngayPhucHoiGanNhat");
  const donationType = form.getFieldValue("loaiHien");

  if (!value || !recoveryDate || !donationType) {
    return Promise.resolve();
  }

  if (!validateDateDifference(recoveryDate, value, donationType)) {
    const requiredWeeks = getRequiredWeeks(donationType);
    const typeName = getDonationTypeName(donationType);
    return Promise.reject(
      new Error(
        `Ngày hiến máu phải cách ngày phục hồi gần nhất ít nhất ${requiredWeeks} tuần cho loại hiến ${typeName}!`
      )
    );
  }

  return Promise.resolve();
};

// Custom validator cho ngày phục hồi gần nhất
const createRecoveryDateValidator = (form) => (_, value) => {
  const donationDate = form.getFieldValue("ngayHienMauDuKien");
  const donationType = form.getFieldValue("loaiHien");

  if (!value || !donationDate || !donationType) {
    return Promise.resolve();
  }

  if (!validateDateDifference(value, donationDate, donationType)) {
    const requiredWeeks = getRequiredWeeks(donationType);
    const typeName = getDonationTypeName(donationType);
    return Promise.reject(
      new Error(
        `Ngày phục hồi phải cách ngày hiến máu dự kiến ít nhất ${requiredWeeks} tuần cho loại hiến ${typeName}!`
      )
    );
  }

  return Promise.resolve();
};

export default function DetailCampaign() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams(); // Nhận id từ URL
  const navigate = useNavigate();

  const now = moment();
  const start = moment(campaign?.ngayBatDau, "YYYY-MM-DD");
  const end = moment(campaign?.ngayKetThuc, "YYYY-MM-DD");
  const isNotYet = now.isBefore(start, "day");
  const isEnded = now.isAfter(end, "day");

  const fetchCampaignDetail = async () => {
    setLoading(true);
    try {
      const res = await getCampaignDetail(id);
      setCampaign(res);
    } catch {
      console.error("Không thể tải chi tiết hoạt động!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetail();
  }, [id]);

  const handleDonateBlood = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        hoatDongHienMau: campaign.id,
        ngayHienMauDuKien: moment(values.ngayHienMauDuKien).format(
          "YYYY-MM-DD"
        ),
        ngayPhucHoiGanNhat: moment(values.ngayPhucHoiGanNhat).format(
          "YYYY-MM-DD"
        ),
        ghiChu: values.ghiChu,
        loaiHien: values.loaiHien.toLowerCase(),
        soLuong: Number(values.soLuong),
        sucKhoeHienTai: values.sucKhoeHienTai,
        dangMangThai: Number(values.dangMangThai),
        macBenhTruyenNhiem: Number(values.macBenhTruyenNhiem),
      };
      await donateBloodRequest(data);
      notification.success({
        message: "Yêu cầu hiến máu đã được gửi thành công!",
        description: `Cảm ơn bạn đã đăng ký hiến máu cho chiến dịch ${campaign.ten}.`,
      });
      setVisible(false);
      form.resetFields();
      fetchCampaignDetail(); // cập nhật lại bảng lịch sử
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error?.data?.message ||
          "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.",
      });
    }
  };
  const handleRecoveryDateChange = () => {
    // Trigger validation cho ngày hiến máu dự kiến
    form.validateFields(["ngayHienMauDuKien"]);
  };

  // Hàm xử lý khi thay đổi ngày hiến máu dự kiến
  const handleDonationDateChange = () => {
    // Trigger validation cho ngày phục hồi gần nhất
    form.validateFields(["ngayPhucHoiGanNhat"]);
  };

  // Hàm xử lý khi thay đổi loại hiến máu
  const handleDonationTypeChange = () => {
    // Trigger validation cho cả hai ngày khi thay đổi loại hiến máu
    form.validateFields(["ngayHienMauDuKien", "ngayPhucHoiGanNhat"]);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2>Không tìm thấy hoạt động nào!</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "200px",
          height: "200px",
          backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          opacity: 0.1,
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <div style={{ padding: "40px 5% 80px 5%", position: "relative" }}>
        {/* Back Button */}
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/user")}
          style={{
            marginBottom: "24px",
            borderRadius: "12px",
            padding: "8px 20px",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          Quay lại
        </Button>

        {/* Hero Section */}
        <Card
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            marginBottom: "40px",
            border: "none",
            backdropFilter: "blur(10px)",
            backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
          styles={{ body: { padding: "60px 40px" } }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <Avatar
              size={120}
              style={{
                background: "linear-gradient(135deg, #d4a574 0%, #b08968 100%)",
                marginBottom: "20px",
                border: "4px solid #e2e8f0",
              }}
              icon={<HeartOutlined style={{ fontSize: "60px", color: "#fff" }} />}
            />
            <Title
              level={1}
              style={{
                color: "#1e293b",
                marginBottom: "16px",
                fontSize: "48px",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Chi tiết chiến dịch hiến máu
            </Title>
            <Paragraph
              style={{
                fontSize: "20px",
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              {campaign.ten}
            </Paragraph>
          </div>

          {/* Campaign Info Cards */}
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={8}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "16px",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
              >
                <EnvironmentOutlined style={{ fontSize: "32px", color: "#d4a574", marginBottom: "12px" }} />
                <Title level={4} style={{ color: "#1e293b", marginBottom: "8px" }}>
                  Địa điểm
                </Title>
                <Text style={{ color: "#64748b", fontSize: "16px" }}>
                  {campaign.diaDiem}
                </Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "16px",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
              >
                <CalendarOutlined style={{ fontSize: "32px", color: "#d4a574", marginBottom: "12px" }} />
                <Title level={4} style={{ color: "#1e293b", marginBottom: "8px" }}>
                  Thời gian
                </Title>
                <Text style={{ color: "#64748b", fontSize: "16px" }}>
                  {campaign.ngayBatDau} - {campaign.ngayKetThuc}
                </Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "16px",
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
              >
                <TeamOutlined style={{ fontSize: "32px", color: "#d4a574", marginBottom: "12px" }} />
                <Title level={4} style={{ color: "#1e293b", marginBottom: "8px" }}>
                  Đăng ký
                </Title>
                <Text style={{ color: "#64748b", fontSize: "16px" }}>
                  {campaign.soLuongNguoiDangKyHienTai}/{campaign.soLuongNguoiToiDa}
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Campaign Details */}
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            <Card
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                border: "none",
                height: "100%",
                backdropFilter: "blur(10px)",
              }}
              styles={{ body: { padding: "40px" } }}
            >
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "16px",
                    border: "3px solid #d4a574",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileTextOutlined style={{ fontSize: "28px", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
                </div>
                <Title level={3} style={{ color: "#1e293b", marginBottom: "16px", fontWeight: "700" }}>
                  Thông tin chiến dịch
                </Title>
              </div>

              <Paragraph style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
                {campaign.moTa}
              </Paragraph>

              <Divider />

              <Descriptions
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <UserOutlined style={{ color: "#d4a574" }} />
                    <span>Thông tin người tạo chiến dịch</span>
                  </div>
                }
                bordered
                column={1}
                style={{ marginTop: "24px" }}
              >
                <Descriptions.Item label="Số điện thoại">
                  {campaign.nguoiTao.soDienThoai}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {campaign.nguoiTao.email}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">
                  {campaign.nguoiTao.diaChi}
                </Descriptions.Item>
              </Descriptions>

              <div style={{ marginTop: "32px", textAlign: "center" }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<HeartOutlined />}
                  onClick={() => setVisible(true)}
                  style={{
                    background: "linear-gradient(135deg, #d4a574 0%, #b08968 100%)",
                    border: "none",
                    borderRadius: "12px",
                    height: "48px",
                    padding: "0 32px",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(212,165,116,0.3)",
                  }}
                  disabled={isNotYet || isEnded}
                >
                  {isNotYet ? "Chưa bắt đầu" : isEnded ? "Đã kết thúc" : "Đăng ký hiến máu"}
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                border: "none",
                height: "100%",
                backdropFilter: "blur(10px)",
              }}
              styles={{ body: { padding: "40px" } }}
            >
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "16px",
                    border: "3px solid #d4a574",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TrophyOutlined style={{ fontSize: "28px", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
                </div>
                <Title level={3} style={{ color: "#1e293b", marginBottom: "16px", fontWeight: "700" }}>
                  Tiến độ đăng ký
                </Title>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                padding: "24px",
                borderRadius: "16px",
                textAlign: "center",
                marginBottom: "24px"
              }}>
                <Progress
                  type="circle"
                  size={120}
                  percent={Math.round((campaign.soLuongNguoiDangKyHienTai / campaign.soLuongNguoiToiDa) * 100)}
                  strokeColor={{
                    '0%': '#d4a574',
                    '100%': '#b08968',
                  }}
                  format={(percent) => (
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
                        {percent}%
                      </div>
                      <div style={{ fontSize: "14px", color: "#64748b" }}>
                        Đã đăng ký
                      </div>
                    </div>
                  )}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "16px" }}>
                  <Text style={{ color: "#64748b", fontSize: "14px" }}>Số người đã đăng ký</Text>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
                    {campaign.soLuongNguoiDangKyHienTai}
                  </div>
                </div>
                <div>
                  <Text style={{ color: "#64748b", fontSize: "14px" }}>Tổng số người tối đa</Text>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
                    {campaign.soLuongNguoiToiDa}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Lịch sử đăng ký */}
        {Array.isArray(campaign.danhSachYeuCauHieuMau) &&
          campaign.danhSachYeuCauHieuMau.length > 0 && (
            <Card
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                border: "none",
                marginTop: "32px",
                backdropFilter: "blur(10px)",
              }}
              styles={{ body: { padding: "40px" } }}
            >
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundImage: "url('https://images.unsplash.com/photo-1615461065929-4cc9af3b2b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "16px",
                    border: "3px solid #d4a574",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleOutlined style={{ fontSize: "28px", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }} />
                </div>
                <Title level={3} style={{ color: "#1e293b", marginBottom: "16px", fontWeight: "700" }}>
                  Lịch sử đăng ký hiến máu
                </Title>
                <Paragraph style={{ color: "#64748b", fontSize: "16px" }}>
                  Danh sách những người đã đăng ký hiến máu cho chiến dịch này
                </Paragraph>
              </div>

              <Table
                rowKey="id"
                dataSource={campaign.danhSachYeuCauHieuMau}
                pagination={{ pageSize: 6 }}
                scroll={{ x: true }}
                columns={[
                  {
                    title: "Người hiến",
                    dataIndex: "nguoiHien",
                    key: "nguoiHien",
                    render: () => (
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <Avatar icon={<UserOutlined />} />
                        Hide Information
                      </div>
                    ),
                  },
                  {
                    title: "Ngày đăng ký",
                    dataIndex: "ngayTao",
                    render: (v) =>
                      v ? new Date(v).toLocaleString("vi-VN") : "-",
                  },
                  {
                    title: "Ngày hiến dự kiến",
                    dataIndex: "ngayHienMauDuKien",
                    render: (v) =>
                      v ? new Date(v).toLocaleDateString("vi-VN") : "-",
                  },
                  {
                    title: "Loại hiến",
                    dataIndex: "loaiHien",
                    render: (v) =>
                      v === "toanphan"
                        ? "Toàn phần"
                        : v === "hongcau"
                        ? "Hồng cầu"
                        : v === "tieucau"
                        ? "Tiểu cầu"
                        : v === "huyettuong"
                        ? "Huyết tương"
                        : v,
                  },
                  {
                    title: "Số lượng (ml)",
                    dataIndex: "soLuong",
                    align: "center",
                  },
                  {
                    title: "Trạng thái",
                    dataIndex: "trangThai",
                    render: (v) => (
                      <Tag color={statusColor[v] || "default"}>
                        {statusText[v] || v}
                      </Tag>
                    ),
                    align: "center",
                  },
                ]}
              />
            </Card>
          )}
      </div>

      {/* Modal Form Đăng ký Hiến máu */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <HeartOutlined style={{ color: "#d4a574", fontSize: "20px" }} />
            <span>Đăng ký hiến máu</span>
          </div>
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
        styles={{
          body: { padding: "24px" },
          header: { borderBottom: "1px solid #f0f0f0" }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleDonateBlood}
          initialValues={{
            hoatDongHienMauId: campaign.id,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày hiến máu dự kiến"
                name="ngayHienMauDuKien"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày hiến máu!" },
                  { validator: createDonationDateValidator(form) },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleDonationDateChange}
                  placeholder="Chọn ngày hiến máu"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày phục hồi gần nhất"
                name="ngayPhucHoiGanNhat"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày phục hồi!" },
                  { validator: createRecoveryDateValidator(form) },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleRecoveryDateChange}
                  placeholder="Chọn ngày phục hồi"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Loại hiến máu"
                name="loaiHien"
                rules={[
                  { required: true, message: "Vui lòng chọn loại hiến máu!" },
                ]}
              >
                <Select
                  placeholder="Chọn loại hiến máu"
                  onChange={handleDonationTypeChange}
                >
                  <Option value="toanphan">Toàn Phần (12 tuần)</Option>
                  <Option value="hongcau">Hồng Cầu (16 tuần)</Option>
                  <Option value="tieucau">Tiểu Cầu (2 tuần)</Option>
                  <Option value="huyettuong">Huyết Tương (2 tuần)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số lượng máu hiến"
                name="soLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn số lượng máu hiến!",
                  },
                ]}
              >
                <Select>
                  <Option value="350">350 ml</Option>
                  <Option value="250">250 ml</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Sức khoẻ hiện tại" name="sucKhoeHienTai">
                <Input.TextArea placeholder="Nhập tình trạng sức khoẻ..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Đang mang thai"
                name="dangMangThai"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select placeholder="Chọn">
                  <Option value={1}>Có</Option>
                  <Option value={0}>Không</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mắc bệnh truyền nhiễm"
                name="macBenhTruyenNhiem"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select placeholder="Chọn">
                  <Option value={1}>Có</Option>
                  <Option value={0}>Không</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Ghi chú" name="ghiChu">
                <Input.TextArea placeholder="Nhập ghi chú nếu có..." />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #d4a574 0%, #b08968 100%)",
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
            }}
          >
            Gửi yêu cầu
          </Button>
        </Form>
      </Modal>

      {/* CSS Animation */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
      `}</style>
    </div>
  );
}
