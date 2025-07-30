import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Descriptions,
  Tag,
  message,
  Form,
  Input,
  Spin,
  Modal,
  Select, // Thêm Select cho dropdown
  Row, // Thêm Row và Col để bố cục form
  Col,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBloodRequestDetail,
  approveRequest,
  rejectRequest,
  completeRequest,
} from "../../services/bloodService";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SaveOutlined,
  EditOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

const { Option } = Select;

// Mapping status to color
const statusMap = {
  dangcho: { text: "Đang chờ", color: "gold" },
  tuchoi: { text: "Từ chối", color: "red" },
  huy: { text: "Hủy", color: "gray" },
  xacnhan: { text: "Xác nhận", color: "blue" },
  dahien: { text: "Đã hiến", color: "green" },
};

export default function BloodRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestDetail, setRequestDetail] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [examData, setExamData] = useState(null);
  const [examForm] = Form.useForm();

  const fetchRequestDetail = async () => {
    setLoading(true);
    setExamData(null);
    try {
      const data = await getBloodRequestDetail(id);
      setRequestDetail(data);

      if (data.formKham) {
        try {
          const parsedExamData = JSON.parse(data.formKham);
          setExamData(parsedExamData);
        } catch (parseError) {
          console.error("Lỗi parse JSON từ formKham:", parseError);
          message.error("Không thể đọc được dữ liệu khám sức khỏe.");
        }
      }
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          "Không lấy được thông tin yêu cầu hiến máu!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetail();
  }, [id]);

  // ---- Các hàm xử lý logic (không thay đổi) ----
  const handleApprove = async () => {
    if (!note) {
      message.error("Bạn cần nhập ghi chú khi duyệt yêu cầu.");
      return;
    }
    setLoading(true);
    try {
      await approveRequest(id, { ghiChu: note });
      message.success("Yêu cầu hiến máu đã được duyệt!");
      fetchRequestDetail();
    } catch (e) {
      message.error(e?.response?.data?.message || "Duyệt yêu cầu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleInitialReject = async () => {
    if (!note) {
      message.error("Bạn cần nhập ghi chú khi từ chối yêu cầu.");
      return;
    }
    setLoading(true);
    try {
      await rejectRequest(id, { ghiChu: note });
      message.success("Yêu cầu hiến máu đã bị từ chối!");
      fetchRequestDetail();
    } catch (e) {
      message.error(e?.response?.data?.message || "Từ chối yêu cầu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const showExamModal = () => {
    if (examData) {
      examForm.setFieldsValue(examData);
    } else {
      examForm.resetFields();
    }
    setIsExamModalVisible(true);
  };

  const handleFinishExam = (values) => {
    setExamData(values);
    setIsExamModalVisible(false);
    message.success("Đã lưu kết quả khám!");
  };

  const handleCompleteAfterExam = async () => {
    if (!note) {
      message.error("Bạn cần nhập vị trí lưu trữ vào ô ghi chú.");
      return;
    }
    if (!examData) {
      message.error("Không có dữ liệu khám sức khỏe.");
      return;
    }
    setLoading(true);
    try {
      await completeRequest(id, {
        viTriLuuTru: note,
        formKham: JSON.stringify(examData),
      });
      message.success("Yêu cầu hiến máu đã hoàn thành!");
      fetchRequestDetail();
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Hoàn thành yêu cầu thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRejectAfterExam = async () => {
    if (!note) {
      message.error("Bạn cần nhập lý do từ chối vào ô ghi chú.");
      return;
    }
    if (!examData) {
      message.error("Không có dữ liệu khám sức khỏe.");
      return;
    }
    setLoading(true);
    try {
      await rejectRequest(id, {
        ghiChu: note,
        formKham: JSON.stringify(examData),
      });
      message.success("Yêu cầu hiến máu đã bị từ chối!");
      fetchRequestDetail();
    } catch (e) {
      message.error(e?.response?.data?.message || "Từ chối yêu cầu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ---- Các hàm render (cập nhật hiển thị) ----
  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );

  if (error)
    return (
      <Card title="Lỗi" style={{ marginTop: 50, textAlign: "center" }}>
        <h3>{error}</h3>
      </Card>
    );

  const renderActionButtons = () => {
    const trangThai = requestDetail?.trangThai;
    if (trangThai === "dangcho") {
      return (
        <>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleApprove}
            style={{ marginRight: 8, backgroundColor: "#4CAF50" }}
          >
            Duyệt
          </Button>
          <Button
            danger
            type="primary"
            icon={<CloseCircleOutlined />}
            onClick={handleInitialReject}
          >
            Từ chối
          </Button>
        </>
      );
    }
    if (trangThai === "xacnhan") {
      if (!examData) {
        return (
          <Button
            type="primary"
            icon={<MedicineBoxOutlined />}
            onClick={showExamModal}
          >
            Nhập thông tin khám
          </Button>
        );
      }
      return (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={showExamModal}
            style={{ marginRight: 8 }}
          >
            Chỉnh sửa kết quả
          </Button>
          <Button
            danger
            type="primary"
            icon={<CloseCircleOutlined />}
            onClick={handleRejectAfterExam}
            style={{ marginRight: 8 }}
          >
            Từ chối
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleCompleteAfterExam}
            style={{ backgroundColor: "#2196F3" }}
          >
            Hoàn thành
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Card
        title={
          <span style={{ fontWeight: 700, fontSize: 20, color: "#3f51b5" }}>
            🩸 Chi tiết yêu cầu hiến máu
          </span>
        }
        extra={
          <Button onClick={() => navigate("/employee/blood-donation-request")}>
            Quay lại
          </Button>
        }
      >
        <Descriptions
          bordered
          size="middle"
          style={{ backgroundColor: "white", borderRadius: 10 }}
          column={3}
        >
          {/* Thông tin người hiến và yêu cầu (không đổi) */}
          <Descriptions.Item label="Tên người hiến">
            {requestDetail?.nguoiHien.ten}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {requestDetail?.nguoiHien.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {requestDetail?.nguoiHien.soDienThoai}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {requestDetail?.nguoiHien.ngaySinh
              ? new Date(requestDetail.nguoiHien.ngaySinh).toLocaleDateString(
                  "vi-VN"
                )
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {requestDetail?.nguoiHien.gioiTinh === "nam"
              ? "Nam"
              : requestDetail?.nguoiHien.gioiTinh === "nu"
              ? "Nữ"
              : requestDetail?.nguoiHien.gioiTinh}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {requestDetail?.nguoiHien.diaChi}
          </Descriptions.Item>
          <Descriptions.Item label="Nhóm máu">
            {requestDetail?.nguoiHien.nhomMau?.ten}
          </Descriptions.Item>
          <Descriptions.Item label="Rh">
            {requestDetail?.nguoiHien.yeuToRh}
          </Descriptions.Item>
          <Descriptions.Item label="Chiều cao (cm)">
            {requestDetail?.nguoiHien.chieuCao}
          </Descriptions.Item>
          <Descriptions.Item label="Cân nặng (kg)">
            {requestDetail?.nguoiHien.canNang}
          </Descriptions.Item>
          <Descriptions.Item label="Tiền sử bệnh">
            {requestDetail?.nguoiHien.tienSuBenh}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={statusMap[requestDetail?.trangThai]?.color}>
              {statusMap[requestDetail?.trangThai]?.text || "Không rõ"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày yêu cầu">
            {new Date(requestDetail?.ngayTao).toLocaleString("vi-VN")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày hiến máu dự kiến">
            {new Date(requestDetail?.ngayHienMauDuKien).toLocaleString("vi-VN")}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng máu">
            {requestDetail?.soLuong} ml
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú">
            {requestDetail?.ghiChu}
          </Descriptions.Item>
          <Descriptions.Item label="Loại hiến">
            {requestDetail?.loaiHien}
          </Descriptions.Item>
          {requestDetail?.nguoiDuyet && (
            <Descriptions.Item label="Người duyệt">
              {requestDetail?.nguoiDuyet.ten}
            </Descriptions.Item>
          )}
        </Descriptions>

        {/* CẬP NHẬT: Hiển thị chi tiết kết quả khám */}
        {examData && (
          <Descriptions
            title={
              <span style={{ color: "#3f51b5", fontWeight: "bold" }}>
                Kết quả khám sàng lọc
              </span>
            }
            bordered
            size="middle"
            style={{
              marginTop: 24,
              backgroundColor: "#f0f5ff",
              borderRadius: 10,
              padding: 16,
            }}
            column={2}
          >
            <Descriptions.Item label="Chiều cao (cm)">
              {examData.chieuCao}
            </Descriptions.Item>
            <Descriptions.Item label="Cân nặng (kg)">
              {examData.canNang}
            </Descriptions.Item>
            <Descriptions.Item label="Huyết áp (mmHg)">
              {examData.huyetAp}
            </Descriptions.Item>
            <Descriptions.Item label="Nhiệt độ (°C)">
              {examData.nhietDo}
            </Descriptions.Item>
            <Descriptions.Item label="Sử dụng chất kích thích">
              {examData.suDungChatKichThich}
            </Descriptions.Item>
            <Descriptions.Item label="Đang dùng thuốc">
              {examData.dangDungThuoc}
            </Descriptions.Item>
            <Descriptions.Item label="Tình trạng huyết sắc tố" span={2}>
              <Tag
                color={
                  examData.kiemTraHuyetSacTo === "Đủ" ? "success" : "warning"
                }
              >
                {examData.kiemTraHuyetSacTo}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Các bệnh mạn tính" span={2}>
              {examData.benhManTinh || "(Không có)"}
            </Descriptions.Item>
            <Descriptions.Item label="Nguy cơ lây nhiễm qua đường máu" span={2}>
              {examData.nguyCoLayNhiem || "(Không có)"}
            </Descriptions.Item>
            <Descriptions.Item label="Kết luận/Ghi chú thêm" span={2}>
              {examData.ketLuan || "(Không có)"}
            </Descriptions.Item>
          </Descriptions>
        )}

        <Form layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item label="Ghi chú / Lý do / Vị trí lưu trữ" name="ghiChu">
            <Input.TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú cho hành động tương ứng..."
              rows={4}
            />
          </Form.Item>
          <div style={{ textAlign: "right", marginTop: 24 }}>
            {renderActionButtons()}
          </div>
        </Form>
      </Card>

      {/* CẬP NHẬT: Form chi tiết trong Modal */}
      <Modal
        title="Phiếu khám sàng lọc sức khỏe"
        open={isExamModalVisible}
        onCancel={() => setIsExamModalVisible(false)}
        footer={null}
        destroyOnClose
        width={800} // Tăng chiều rộng modal
      >
        <Form
          form={examForm}
          layout="vertical"
          onFinish={handleFinishExam}
          initialValues={{
            benhManTinh: "",
            nguyCoLayNhiem: "",
            suDungChatKichThich: "Không",
            dangDungThuoc: "Không",
            huyetAp: "",
            nhietDo: "",
            canNang: "",
            chieuCao: "",
            kiemTraHuyetSacTo: "Đủ",
            ketLuan: "",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="chieuCao"
                label="Chiều cao (cm)"
                rules={[
                  { required: true, message: "Vui lòng nhập chiều cao!" },
                ]}
              >
                <Input type="number" placeholder="Ví dụ: 170" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="canNang"
                label="Cân nặng (kg)"
                rules={[{ required: true, message: "Vui lòng nhập cân nặng!" }]}
              >
                <Input type="number" placeholder="Ví dụ: 65" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="huyetAp"
                label="Đo huyết áp (mmHg)"
                rules={[{ required: true, message: "Vui lòng nhập huyết áp!" }]}
              >
                <Input placeholder="Ví dụ: 120/80" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nhietDo"
                label="Nhiệt độ (°C)"
                rules={[{ required: true, message: "Vui lòng nhập nhiệt độ!" }]}
              >
                <Input type="number" step="0.1" placeholder="Ví dụ: 36.8" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="suDungChatKichThich"
                label="Việc sử dụng chất kích thích, rượu, bia, thuốc lá"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Không">Không</Option>
                  <Option value="Thỉnh thoảng">Thỉnh thoảng</Option>
                  <Option value="Thường xuyên">Thường xuyên</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dangDungThuoc"
                label="Đang dùng thuốc"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Không">Không</Option>
                  <Option value="Kháng sinh">Kháng sinh</Option>
                  <Option value="Aspirin">Aspirin</Option>
                  <Option value="Thuốc điều trị mạn tính">
                    Thuốc điều trị mạn tính
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="kiemTraHuyetSacTo"
                label="Kiểm tra huyết sắc tố để đánh giá thiếu máu"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Đủ">Đủ điều kiện</Option>
                  <Option value="Không đủ">Không đủ điều kiện</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="benhManTinh"
                label="Các bệnh mạn tính (tim mạch, huyết áp, tiểu đường, dạ dày, hô hấp, gan, thận...)"
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Liệt kê các bệnh mạn tính nếu có"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="nguyCoLayNhiem"
                label="Nguy cơ lây nhiễm qua đường máu (quan hệ không an toàn, xăm hình/châm cứu gần đây...)"
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Liệt kê các hành vi nguy cơ nếu có"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="ketLuan"
                label="Kết luận/Ghi chú thêm của nhân viên y tế"
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Ghi chú thêm về tình trạng sức khỏe của người hiến"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right", marginTop: 16 }}>
            <Button
              onClick={() => setIsExamModalVisible(false)}
              style={{ marginRight: 8 }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu kết quả
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
