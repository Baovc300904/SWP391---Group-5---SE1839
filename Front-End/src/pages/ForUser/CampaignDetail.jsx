// Import moment để xử lý định dạng ngày
import moment from "moment";

// DetailCampaign.js
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
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCampaignDetail } from "../../services/campaignService";
import { donateBloodRequest } from "../../services/donationService";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function DetailCampaign() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams(); // Nhận id từ URL
  const navigate = useNavigate();

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
        hoatDongHienMauId: campaign.id,
        ngayHienMauDuKien: moment(values.ngayHienMauDuKien).format(
          "YYYY-MM-DD"
        ),
        ngayPhucHoiGanNhat: moment(values.ngayPhucHoiGanNhat).format(
          "YYYY-MM-DD"
        ),
        ghiChu: values.ghiChu,
        loaiHien: values.loaiHien.toLowerCase(),
        soLuong: Number(values.soLuong),
      };
      await donateBloodRequest(data);
      notification.success({
        message: "Yêu cầu hiến máu đã được gửi thành công!",
        description: `Cảm ơn bạn đã đăng ký hiến máu cho chiến dịch ${campaign.ten}.`,
      });
      setVisible(false);
    } catch (error) {
      // Hiển thị lỗi từ err.data.message nếu có
      notification.error({
        message: "Lỗi",
        description:
          error?.data?.message ||
          "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.",
      });
    }
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
          onClick={() => setVisible(true)} // Mở modal khi nhấn nút
          style={{
            backgroundColor: "#ec407a",
            borderColor: "#ec407a",
            marginTop: 20,
            borderRadius: "20px",
            padding: "12px 20px",
          }}
        >
          Hiến máu
        </Button>
      </div>

      {/* Modal Form Đăng ký Hiến máu */}
      <Modal
        title="Đăng ký hiến máu"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleDonateBlood}
          initialValues={{
            hoatDongHienMauId: campaign.id,
          }}
        >
          <Form.Item
            label="Ngày hiến máu dự kiến"
            name="ngayHienMauDuKien"
            rules={[
              { required: true, message: "Vui lòng chọn ngày hiến máu!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Ngày phục hồi gần nhất"
            name="ngayPhucHoiGanNhat"
            rules={[
              { required: true, message: "Vui lòng chọn ngày phục hồi!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Ghi chú" name="ghiChu">
            <Input.TextArea placeholder="Nhập ghi chú nếu có..." />
          </Form.Item>

          <Form.Item
            label="Loại hiến máu"
            name="loaiHien"
            rules={[
              { required: true, message: "Vui lòng chọn loại hiến máu!" },
            ]}
          >
            <Select placeholder="Chọn loại hiến máu" style={{ width: "100%" }}>
              <Option value="toanphan">Toàn Phần</Option>
              <Option value="hongcau">Hồng Cầu</Option>
              <Option value="tieucau">Tiểu Cầu</Option>
              <Option value="huyettuong">Huyết Tương</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Số lượng máu hiến"
            name="soLuong"
            rules={[
              { required: true, message: "Vui lòng chọn số lượng máu hiến!" },
            ]}
          >
            <Select style={{ width: "100%" }}>
              {" "}
              {/* Mặc định là 350 */}
              <Option value="350">350 ml</Option>
              <Option value="250">250 ml</Option>
            </Select>
          </Form.Item>

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
            }}
          >
            Gửi yêu cầu
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
