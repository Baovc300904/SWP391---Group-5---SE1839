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
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCampaignDetail } from "../../services/campaignService";
import { donateBloodRequest } from "../../services/donationService";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
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
  const handleRecoveryDateChange = (date) => {
    // Trigger validation cho ngày hiến máu dự kiến
    form.validateFields(["ngayHienMauDuKien"]);
  };

  // Hàm xử lý khi thay đổi ngày hiến máu dự kiến
  const handleDonationDateChange = (date) => {
    // Trigger validation cho ngày phục hồi gần nhất
    form.validateFields(["ngayPhucHoiGanNhat"]);
  };

  // Hàm xử lý khi thay đổi loại hiến máu
  const handleDonationTypeChange = (type) => {
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
        padding: "60px 20px",
        background: "linear-gradient(to right, #ffffff, #f3e5f5)",
        minHeight: "100vh",
      }}
    >
      <Button
        type="default"
        onClick={() => navigate("/user")}
        style={{ marginBottom: 20, borderRadius: "20px", padding: "8px 20px" }}
      >
        Quay lại
      </Button>

      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#4a148c",
          marginBottom: 40,
        }}
      >
        Chi tiết chiến dịch hiến máu: {campaign.ten}
      </Title>

      <div
        style={{
          background: "#ffffffcc",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
        }}
      >
        <Title level={3} style={{ color: "#6a1b9a" }}>
          {campaign.ten}
        </Title>

        <Tag color="geekblue" style={{ marginBottom: 12 }}>
          {campaign.diaDiem}
        </Tag>

        <Paragraph style={{ color: "#555", minHeight: 80 }}>
          {campaign.moTa}
        </Paragraph>

        <div style={{ marginTop: 12, marginBottom: 12 }}>
          <Tag color="gold">Bắt đầu: {campaign.ngayBatDau}</Tag>
          <Tag color="volcano">Kết thúc: {campaign.ngayKetThuc}</Tag>
          <Tag color="green">
            {campaign.soLuongNguoiDangKyHienTai}/{campaign.soLuongNguoiToiDa}{" "}
            người đăng ký
          </Tag>
        </div>

        <Descriptions
          title="Thông tin người tạo chiến dịch"
          bordered
          column={1}
          style={{ marginTop: 24 }}
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

        <Button
          type="primary"
          shape="round"
          onClick={() => setVisible(true)}
          style={{
            backgroundColor: "#ec407a",
            borderColor: "#ec407a",
            marginTop: 20,
            borderRadius: "20px",
            padding: "12px 20px",
          }}
          disabled={isNotYet || isEnded}
        >
          Hiến máu
        </Button>
      </div>

      {/* Modal Form Đăng ký Hiến máu */}
      <Modal
        title="Đăng ký hiến máu"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
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
              borderRadius: 30,
              background: "#ec407a",
              borderColor: "#ec407a",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
            }}
          >
            Gửi yêu cầu
          </Button>
        </Form>
      </Modal>

      {/* ========== LỊCH SỬ ĐĂNG KÝ HIẾN MÁU ========== */}
      {Array.isArray(campaign.danhSachYeuCauHieuMau) &&
        campaign.danhSachYeuCauHieuMau.length > 0 && (
          <div
            style={{
              marginTop: 42,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px #d1c4e9",
              padding: 16,
            }}
          >
            <Title
              level={4}
              style={{
                marginBottom: 18,
                color: "#6a1b9a",
              }}
            >
              Lịch sử đăng ký hiến máu cho chiến dịch này
            </Title>
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
          </div>
        )}
    </div>
  );
}
