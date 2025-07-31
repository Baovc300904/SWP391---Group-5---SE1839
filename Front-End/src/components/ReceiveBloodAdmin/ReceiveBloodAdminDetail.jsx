import {
  Card,
  Button,
  Tag,
  message,
  Form,
  Input,
  Descriptions,
  Spin,
  Row,
  Col,
  Modal, // Thêm
  Select, // Thêm
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBloodReceiveRequestDetail,
  updateBloodReceiveRequestStatus,
  getAvailableBloodUnitWarehouses,
  getUsedBloodUnits,
} from "../../services/receiveBloodAdminService";
import { MedicineBoxOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;

// Mapping status for blood unit
const statusTagMap = {
  sansang: { text: "Sẵn sàng", color: "green" },
  dasudung: { text: "Đã sử dụng", color: "yellow" },
  huybo: { text: "Hủy bỏ", color: "red" },
  choxetnghiem: { text: "Chờ xét nghiệm", color: "blue" },
  dangcho: { text: "Đang chờ", color: "gold" },
  dacomau: { text: "Đã có máu", color: "green" },
  hoanthanh: { text: "Hoàn thành", color: "blue" },
};

export default function BloodReceiveRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [requestDetail, setRequestDetail] = useState(null);
  const [availableWarehouses, setAvailableWarehouses] = useState([]);
  const [usedBloodUnits, setUsedBloodUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [note, setNote] = useState("");
  const [selectedWarehouses, setSelectedWarehouses] = useState([]); // list id
  const [error, setError] = useState("");

  // State mới cho form khám
  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [examData, setExamData] = useState(null);
  const [examForm] = Form.useForm();

  // Fetch details and blood units
  const fetchDetails = async () => {
    setLoading(true);
    setExamData(null); // Reset dữ liệu khám mỗi lần fetch
    try {
      const data = await getBloodReceiveRequestDetail(id);
      setRequestDetail(data);

      // Parse dữ liệu khám nếu có
      if (data.formKham) {
        try {
          setExamData(JSON.parse(data.formKham));
        } catch (e) {
          console.error("Lỗi parse JSON từ formKham", e);
          message.error("Lỗi khi đọc dữ liệu khám.");
        }
      }

      if (data.trangThai === "dangcho") {
        const available = await getAvailableBloodUnitWarehouses(id);
        setAvailableWarehouses(available || []);
      } else {
        setAvailableWarehouses([]);
      }

      const used = await getUsedBloodUnits(id);
      setUsedBloodUnits(used || []);
      setError("");
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.data?.message ||
          "Lỗi khi lấy thông tin yêu cầu nhận máu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, [id]);

  const toggleWarehouse = (warehouseId) => {
    setSelectedWarehouses((prev) =>
      prev.includes(warehouseId)
        ? prev.filter((id) => id !== warehouseId)
        : [...prev, warehouseId]
    );
  };

  // Chuyển sang "Đã có máu"
  const handleSetAvailable = async () => {
    if (!selectedWarehouses.length) {
      message.warning("Vui lòng chọn ít nhất một đơn vị máu.");
      return;
    }
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "available", {
        danhSachKhoDonViMau: selectedWarehouses,
      });
      message.success("Trạng thái đã được cập nhật sang 'Đã có máu'.");
      fetchDetails();
    } catch (e) {
      message.error(
        e?.response?.data?.message ||
          e?.data?.message ||
          "Lỗi khi cập nhật trạng thái."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Các hàm xử lý sau khi có form khám
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

  const handleCancelAfterExam = async () => {
    if (!note) {
      message.error("Vui lòng nhập lý do hủy vào ô ghi chú.");
      return;
    }
    if (!examData) {
      message.error("Không tìm thấy dữ liệu khám để gửi kèm.");
      return;
    }
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "reject", {
        ghiChu: note,
        formKham: JSON.stringify(examData),
      });
      message.success("Yêu cầu nhận máu đã bị hủy.");
      navigate("/employee/receive-blood-manager");
    } catch (e) {
      message.error(
        e?.response?.data?.message || e?.data?.message || "Lỗi khi hủy yêu cầu."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteAfterExam = async () => {
    if (!examData) {
      message.error("Không tìm thấy dữ liệu khám để gửi kèm.");
      return;
    }
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "complete", {
        ghiChu: note,
        formKham: JSON.stringify(examData),
      });
      message.success("Yêu cầu nhận máu đã hoàn thành.");
      navigate("/employee/receive-blood-manager");
    } catch (e) {
      message.error(
        e?.response?.data?.message ||
          e?.data?.message ||
          "Lỗi khi hoàn thành yêu cầu."
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );

  if (error)
    return (
      <Card title="Lỗi" style={{ marginTop: 50, textAlign: "center" }}>
        <h3>{error}</h3>
        <Button type="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Card>
    );

  // Render các nút chức năng chính
  const renderActionButtons = () => {
    const trangThai = requestDetail?.trangThai;

    if (trangThai === "dangcho") {
      return (
        <Button
          type="primary"
          loading={actionLoading}
          onClick={handleSetAvailable}
          style={{ background: "#2196F3", borderColor: "#2196F3" }}
        >
          Chuyển sang "Đã có máu"
        </Button>
      );
    }

    if (trangThai === "dacomau") {
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
            onClick={handleCancelAfterExam}
            style={{ marginRight: 8 }}
            loading={actionLoading}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleCompleteAfterExam}
            loading={actionLoading}
            style={{ background: "#4CAF50" }}
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
            🩸 Chi tiết yêu cầu nhận máu
          </span>
        }
        extra={
          <Button onClick={() => navigate("/employee/receive-blood-manager")}>
            Quay lại
          </Button>
        }
      >
        <Descriptions
          bordered
          size="middle"
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 18,
          }}
          column={2}
        >
          {/* ... Thông tin không đổi ... */}
          <Descriptions.Item label="Người nhận">
            {requestDetail?.nguoiNhan.ten}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={statusTagMap[requestDetail?.trangThai]?.color}>
              {statusTagMap[requestDetail?.trangThai]?.text || "Không rõ"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {requestDetail?.nguoiNhan.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {requestDetail?.nguoiNhan.soDienThoai}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {requestDetail?.nguoiNhan.diaChi}
          </Descriptions.Item>
          <Descriptions.Item label="Nhóm máu người nhận">
            {requestDetail?.nguoiNhan?.nhomMau?.ten}
          </Descriptions.Item>
          <Descriptions.Item label="Nhóm máu cần nhận">
                            <b style={{ color: "#1976d2" }}>{requestDetail?.nhomMau?.ten}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Lý do">
            {requestDetail?.lyDo || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Sức khỏe hiện tại">
            {requestDetail?.sucKhoeHienTai}
          </Descriptions.Item>
          <Descriptions.Item label="Đang mang thai">
            {requestDetail?.dangMangThai === 1 ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Mắc bệnh truyền nhiễm">
            {requestDetail?.macBenhTruyenNhiem === 1 ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày yêu cầu">
            {new Date(requestDetail?.ngayTao).toLocaleString("vi-VN")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nhận máu dự kiến">
            {new Date(requestDetail?.ngayNhanMauDuKien).toLocaleDateString(
              "vi-VN"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Thành phần máu cần">
            {requestDetail?.thanhPhanMauCan === "toanphan"
              ? "Toàn phần"
              : requestDetail?.thanhPhanMauCan === "hongcau"
              ? "Hồng cầu"
              : requestDetail?.thanhPhanMauCan === "tieucau"
              ? "Tiểu cầu"
              : requestDetail?.thanhPhanMauCan === "huyettuong"
              ? "Huyết tương"
              : requestDetail?.thanhPhanMauCan}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng cần (ml)">
            {requestDetail?.soLuongDonVi}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ nhận máu" span={2}>
            {requestDetail?.diaChiNhanMau}
          </Descriptions.Item>
        </Descriptions>

        {/* HIỂN THỊ DỮ LIỆU KHÁM SÀNG LỌC NẾU CÓ */}
        {examData && (
          <Descriptions
            title={
              <span style={{ color: "#3f51b5", fontWeight: "bold" }}>
                Kết quả khám sàng lọc trước nhận máu
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
            <Descriptions.Item label="Dấu hiệu nhiễm trùng">
              <Tag
                color={
                  examData.dauHieuNhiemTrung === "Có" ? "warning" : "success"
                }
              >
                {examData.dauHieuNhiemTrung}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Kháng thể bất thường">
              <Tag
                color={
                  examData.khangTheBatThuong === "Có" ? "warning" : "success"
                }
              >
                {examData.khangTheBatThuong}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Xét nghiệm hòa hợp" span={2}>
              <Tag
                color={
                  examData.xetNghiemHoaHop === "Hòa hợp" ? "success" : "error"
                }
              >
                {examData.xetNghiemHoaHop}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Dị ứng" span={2}>
              {examData.diUng || "(Không có)"}
            </Descriptions.Item>
            <Descriptions.Item label="Bệnh lý nền" span={2}>
              {examData.benhLyNen || "(Không có)"}
            </Descriptions.Item>
          </Descriptions>
        )}

        <Form layout="vertical" style={{ marginTop: 8 }}>
          {requestDetail?.trangThai === "dacomau" && (
            <Form.Item label="Ghi chú (Lý do hủy nếu có)">
              <Input.TextArea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú xử lý hoặc lý do hủy..."
              />
            </Form.Item>
          )}

          {/* List đơn vị máu phù hợp trong kho */}
          {requestDetail?.trangThai === "dangcho" && (
            <Form.Item label="Chọn đơn vị máu phù hợp">
              <Row gutter={[16, 16]}>
                {availableWarehouses.map((wh) => {
                  const checked = selectedWarehouses.includes(wh.id);
                  return (
                    <Col
                      key={wh.id}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      onClick={() => toggleWarehouse(wh.id)}
                    >
                      <Card
                        hoverable
                        style={{
                          border: checked
                            ? "2.5px solid #43a047"
                            : "1.5px solid #e0e0e0",
                          boxShadow: checked
                            ? "0 2px 12px #43a04744"
                            : "0 1px 5px #0001",
                          borderRadius: 18,
                          background: checked ? "#e8f5e9" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        bodyStyle={{ padding: 14 }}
                      >
                        <span style={{ fontWeight: 700, fontSize: 15 }}>
                          {wh.viTriLuuTru}
                        </span>
                        <Tag color={statusTagMap[wh.trangThai]?.color}>
                          {statusTagMap[wh.trangThai]?.text}
                        </Tag>
                        <div style={{ fontSize: 13, marginTop: 4 }}>
                          Ngày lấy:{" "}
                          {wh.ngayLayMau
                            ? new Date(wh.ngayLayMau).toLocaleDateString(
                                "vi-VN"
                              )
                            : "-"}
                        </div>
                        <div style={{ fontSize: 13 }}>
                          HSD:{" "}
                          {wh.ngayHetHan
                            ? new Date(wh.ngayHetHan).toLocaleDateString(
                                "vi-VN"
                              )
                            : "-"}
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {availableWarehouses.length === 0 && (
                <i>Không có đơn vị máu phù hợp</i>
              )}
            </Form.Item>
          )}

          {/* List máu đã sử dụng */}
          {usedBloodUnits.length > 0 && (
            <Form.Item label="Đơn vị máu đã sử dụng cho yêu cầu này">
              <Row gutter={[16, 16]}>
                {usedBloodUnits.map((wh) => (
                  <Col key={wh.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card
                      bordered
                      style={{
                        border: "1.5px solid #bdbdbd",
                        borderRadius: 18,
                        background: "#f3f8fd",
                      }}
                      bodyStyle={{ padding: 14 }}
                    >
                      <span style={{ fontWeight: 700, fontSize: 15 }}>
                        {wh.viTriLuuTru}
                      </span>
                      <Tag color={statusTagMap[wh.trangThai]?.color}>
                        {statusTagMap[wh.trangThai]?.text}
                      </Tag>
                      <div style={{ fontSize: 13, marginTop: 4 }}>
                        Ngày lấy:{" "}
                        {wh.ngayLayMau
                          ? new Date(wh.ngayLayMau).toLocaleDateString("vi-VN")
                          : "-"}
                      </div>
                      <div style={{ fontSize: 13 }}>
                        HSD:{" "}
                        {wh.ngayHetHan
                          ? new Date(wh.ngayHetHan).toLocaleDateString("vi-VN")
                          : "-"}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          )}

          <div style={{ textAlign: "right", marginTop: 12 }}>
            {renderActionButtons()}
          </div>
        </Form>
      </Card>

      {/* MODAL FORM KHÁM */}
      <Modal
        title="Phiếu khám sàng lọc trước nhận máu"
        open={isExamModalVisible}
        onCancel={() => setIsExamModalVisible(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form
          form={examForm}
          layout="vertical"
          onFinish={handleFinishExam}
          initialValues={{
            huyetAp: "",
            dauHieuNhiemTrung: "Không có",
            nhietDo: "",
            chieuCao: "",
            canNang: "",
            diUng: "",
            benhLyNen: "",
            xetNghiemHoaHop: "Hòa hợp",
            khangTheBatThuong: "Không có",
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="chieuCao"
                label="Chiều cao (cm)"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Ví dụ: 160" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="canNang"
                label="Cân nặng (kg)"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Ví dụ: 55" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="huyetAp"
                label="Huyết áp (mmHg)"
                rules={[{ required: true }]}
              >
                <Input placeholder="Ví dụ: 120/80" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nhietDo"
                label="Nhiệt độ (°C)"
                rules={[{ required: true }]}
              >
                <Input type="number" step="0.1" placeholder="Ví dụ: 37" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dauHieuNhiemTrung"
                label="Dấu hiệu nhiễm trùng"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Có">Có</Option>
                  <Option value="Không có">Không có</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="khangTheBatThuong"
                label="Kiểm tra các kháng thể bất thường"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Có">Có</Option>
                  <Option value="Không có">Không có</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="xetNghiemHoaHop"
                label="Xét nghiệm hòa hợp"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Hòa hợp">Hòa hợp</Option>
                  <Option value="Không hòa hợp">Không hòa hợp</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="diUng" label="Dị ứng">
                <Input.TextArea
                  rows={3}
                  placeholder="Liệt kê các loại dị ứng nếu có (thuốc, thức ăn...)"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="benhLyNen" label="Bệnh lý nền">
                <Input.TextArea
                  rows={3}
                  placeholder="Liệt kê các bệnh lý nền nếu có"
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
