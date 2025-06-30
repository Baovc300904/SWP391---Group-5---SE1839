import {
  Button,
  Card,
  message,
  Select,
  Space,
  Form,
  Input,
  Row,
  Col,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBloodReceiveRequestDetail,
  updateBloodReceiveRequestStatus,
  getBloodUnitWarehouses,
} from "../../services/receiveBloodAdminService";

// Mapping status for khoDonViMau
const statusTagMap = {
  sansang: { text: "Sẵn sàng", color: "green" },
  dasudung: { text: "Đã sử dụng", color: "yellow" },
  huybo: { text: "Hủy bỏ", color: "red" },
  choxetnghiem: { text: "Chờ xét nghiệm", color: "blue" },
  dangcho: { text: "Đang chờ", color: "gold" }, // Waiting status
  dacomau: { text: "Đã có máu", color: "green" }, // Blood received
};

export default function BloodReceiveRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [requestDetail, setRequestDetail] = useState(null);
  const [bloodWarehouses, setBloodWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [note, setNote] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState(null); // Track selected warehouse
  const [status, setStatus] = useState("dangcho"); // Track status

  // Fetch blood receive request details
  const fetchDetails = async () => {
    setLoading(true);
    try {
      const data = await getBloodReceiveRequestDetail(id);
      setRequestDetail(data);
      setStatus(data.trangThai); // Set the current status

      // If the request is 'dangcho', fetch available blood unit warehouses
      if (data.trangThai === "dangcho") {
        const warehouses = await getBloodUnitWarehouses({ status: "sansang" });
        setBloodWarehouses(warehouses.content || []);
      }
    } catch (e) {
      message.error(
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
  }, [id]);

  // Handle changing status to "Đã có máu"
  const handleChangeStatus = async () => {
    if (!selectedWarehouse) {
      message.warning("Vui lòng chọn kho máu.");
      return;
    }

    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "available", {
        khoDonViMau: selectedWarehouse, // Send the selected warehouse id
      });
      message.success("Trạng thái đã được cập nhật sang 'Đã có máu'.");
      fetchDetails(); // Re-fetch details to update the UI
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

  // Handle cancel by admin
  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "reject", { ghiChu: note });
      message.success("Yêu cầu nhận máu đã bị hủy.");
      navigate("/admin/receive-blood-manager");
    } catch (e) {
      message.error(
        e?.response?.data?.message || e?.data?.message || "Lỗi khi hủy yêu cầu."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Handle complete
  const handleComplete = async () => {
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "complete", {});
      message.success("Yêu cầu nhận máu đã hoàn thành.");
      navigate("/admin/receive-blood-manager");
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

  if (loading || !requestDetail) return <div>Loading...</div>;

  return (
    <Card title="Chi tiết yêu cầu nhận máu" style={{ marginBottom: 20 }}>
      <Row gutter={16}>
        <Col span={12}>
          <strong>Người nhận:</strong> {requestDetail.nguoiNhan.ten}
        </Col>
        <Col span={12}>
          <strong>Ngày yêu cầu:</strong>{" "}
          {new Date(requestDetail.ngayTao).toLocaleString("vi-VN")}
        </Col>
        <Col span={12}>
          <strong>Email:</strong> {requestDetail.nguoiNhan.email}
        </Col>
        <Col span={12}>
          <strong>Số điện thoại:</strong> {requestDetail.nguoiNhan.soDienThoai}
        </Col>
        <Col span={12}>
          <strong>Địa chỉ:</strong> {requestDetail.nguoiNhan.diaChi}
        </Col>
        <Col span={12}>
          <strong>Nhóm máu:</strong> {requestDetail.nguoiNhan.nhomMau.ten}
        </Col>
        <Col span={12}>
          <strong>Lý do:</strong> {requestDetail.lyDo || "Không có"}
        </Col>
        <Col span={12}>
          <strong>Ngày nhận máu dự kiến:</strong>{" "}
          {new Date(requestDetail.ngayNhanMauDuKien).toLocaleString("vi-VN")}
        </Col>
        <Col span={12}>
          <strong>Địa chỉ nhận máu:</strong> {requestDetail.diaChiNhanMau}
        </Col>
        <Col span={12}>
          <strong>Kho đơn vị máu:</strong>{" "}
          {requestDetail.khoDonViMau?.viTriLuuTru}
        </Col>
        <Col span={12}>
          <strong>Trạng thái kho máu:</strong>{" "}
          <Tag
            color={statusTagMap[requestDetail.khoDonViMau?.trangThai]?.color}
          >
            {statusTagMap[requestDetail.khoDonViMau?.trangThai]?.text}
          </Tag>
        </Col>
      </Row>

      <Form layout="vertical" style={{ marginTop: 20 }}>
        <Form.Item label="Ghi chú">
          <Input.TextArea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Item>

        {/* Only show the kho máu selection when status is "dangcho" */}
        {status === "dangcho" && (
          <Form.Item label="Chọn kho máu">
            <Select
              placeholder="Chọn kho máu"
              value={selectedWarehouse}
              onChange={(value) => setSelectedWarehouse(value)}
            >
              {bloodWarehouses.map((warehouse) => (
                <Option key={warehouse.id} value={warehouse.id}>
                  {warehouse.viTriLuuTru}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Space>
          <Button
            type="primary"
            loading={actionLoading}
            onClick={handleChangeStatus}
            disabled={status !== "dangcho"}
          >
            Chuyển sang đã có máu
          </Button>
          <Button danger loading={actionLoading} onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            type="default"
            loading={actionLoading}
            onClick={handleComplete}
            disabled={status !== "dacomau"}
          >
            Hoàn thành
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
