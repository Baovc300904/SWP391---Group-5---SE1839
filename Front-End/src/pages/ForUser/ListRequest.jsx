import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Tag,
  notification,
  Spin,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import {
  getDonationRequests,
  cancelRequest,
  updateRequest,
} from "../../services/donationService";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
const loaiHienMap = {
  toanphan: { label: "Toàn Phần", color: "blue" },
  huyettuong: { label: "Huyết Tương", color: "green" },
  hongcau: { label: "Hồng Cầu", color: "orange" },
  tieucau: { label: "Tiểu Cầu", color: "purple" },
};

export default function BloodDonationRequests() {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form] = Form.useForm();

  // Lấy danh sách yêu cầu hiến máu
  const fetchDonationRequests = async () => {
    setLoading(true);
    try {
      const res = await getDonationRequests(1, "", "");
      setDonationRequests(res.content || []);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message || "Không thể tải danh sách yêu cầu hiến máu!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Hủy yêu cầu hiến máu
  const handleCancelRequest = async (id) => {
    try {
      await cancelRequest(id);
      notification.success({
        message: "Yêu cầu hiến máu đã bị hủy thành công!",
      });
      fetchDonationRequests();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message || "Đã xảy ra lỗi khi hủy yêu cầu. Vui lòng thử lại.",
      });
    }
  };

  // Mở modal cập nhật và set giá trị form
  const handleEditRequest = (item) => {
    setSelectedRequest(item);
    form.setFieldsValue({
      ngayHienMauDuKien: item.ngayHienMauDuKien
        ? moment(item.ngayHienMauDuKien)
        : null,
      ngayPhucHoiGanNhat: item.ngayPhucHoiGanNhat
        ? moment(item.ngayPhucHoiGanNhat)
        : null,
      ghiChu: item.ghiChu,
      loaiHien: item.loaiHien,
    });
    setVisible(true);
  };

  // Cập nhật yêu cầu hiến máu
  const handleUpdateRequest = async (values) => {
    try {
      const updatedData = {
        id: selectedRequest.id,
        ngayHienMauDuKien: values.ngayHienMauDuKien.format("YYYY-MM-DD"),
        ngayPhucHoiGanNhat: values.ngayPhucHoiGanNhat.format("YYYY-MM-DD"),
        ghiChu: values.ghiChu,
        loaiHien: values.loaiHien,
        trangThai: "dangcho",
        soLuong: values.soLuong,
      };
      await updateRequest(updatedData);
      notification.success({
        message: "Cập nhật yêu cầu hiến máu thành công!",
      });
      setVisible(false);
      fetchDonationRequests();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description:
          error.message ||
          "Đã xảy ra lỗi khi cập nhật yêu cầu. Vui lòng thử lại.",
      });
    }
  };

  useEffect(() => {
    fetchDonationRequests();
  }, []);

  return (
    <div
      style={{
        padding: "60px 20px",
        background: "linear-gradient(to right, #ffffff, #f3e5f5)",
        minHeight: "100vh",
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#4a148c",
          marginBottom: 40,
        }}
      >
        Danh sách yêu cầu hiến máu
      </Title>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "20px",
            paddingBottom: "40px",
          }}
        >
          {donationRequests.map((item) => (
            <Card
              key={item.id}
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              }}
              title={`Ngày hiến: ${item.ngayHienMauDuKien}`}
            >
              <div>
                <Tag color={loaiHienMap[item.loaiHien]?.color || "default"}>
                  {loaiHienMap[item.loaiHien]?.label || item.loaiHien}
                </Tag>
                <Tag color="gold">{item.soLuong} ml</Tag>
                <Tag
                  color={
                    item.trangThai === "dangcho"
                      ? "orange"
                      : item.trangThai === "xacnhan"
                      ? "blue"
                      : item.trangThai === "dahien"
                      ? "green"
                      : item.trangThai === "huy"
                      ? "red"
                      : item.trangThai === "tuchoi"
                      ? "gray"
                      : "default"
                  }
                >
                  {item.trangThai === "dangcho"
                    ? "Đang chờ"
                    : item.trangThai === "xacnhan"
                    ? "Đã xác nhận"
                    : item.trangThai === "dahien"
                    ? "Đã hiến"
                    : item.trangThai === "huy"
                    ? "Đã hủy"
                    : item.trangThai === "tuchoi"
                    ? "Từ chối"
                    : "Không xác định"}
                </Tag>
              </div>
              <p>
                <strong>Ghi chú:</strong> {item.ghiChu}
              </p>
              <p>
                <strong>Người duyệt:</strong>{" "}
                {item.nguoiDuyet ? item.nguoiDuyet.ten : "Chưa duyệt"}
              </p>
              <p>
                <strong>Người hiến:</strong> {item.nguoiHien.ten}
              </p>
              <Button
                type="danger"
                onClick={() => handleCancelRequest(item.id)}
                style={{
                  borderRadius: "12px",
                  padding: "8px 16px",
                  background: item.trangThai !== "dangcho" ? "grey" : "#d48806",
                  color: "white",
                }}
                disabled={item.trangThai !== "dangcho"}
              >
                Hủy yêu cầu
              </Button>
              <Button
                type="primary"
                onClick={() => handleEditRequest(item)}
                style={{
                  marginLeft: "10px",
                  borderRadius: "12px",
                  padding: "8px 16px",
                }}
                disabled={item.trangThai !== "dangcho"}
              >
                Cập nhật
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form Cập nhật yêu cầu hiến máu */}
      <Modal
        title="Cập nhật yêu cầu hiến máu"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateRequest}
          initialValues={{
            hoatDongHienMauId: selectedRequest?.hoatDongHienMauId,
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
            <Select style={{ width: "100%" }}>
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
            <Select
              style={{ width: "100%" }}
              defaultValue={selectedRequest?.soLuong || 350}
            >
              {" "}
              {/* Mặc định là 350 */}
              <Option value={350}>350 ml</Option>
              <Option value={250}>250 ml</Option>
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
            Cập nhật
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
