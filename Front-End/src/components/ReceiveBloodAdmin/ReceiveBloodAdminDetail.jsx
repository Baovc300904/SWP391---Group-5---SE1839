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
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBloodReceiveRequestDetail,
  updateBloodReceiveRequestStatus,
  getAvailableBloodUnitWarehouses,
  getUsedBloodUnits,
} from "../../services/receiveBloodAdminService";
import { RollbackOutlined } from "@ant-design/icons";

// Mapping status for blood unit
const statusTagMap = {
  sansang: { text: "Sẵn sàng", color: "green" },
  dasudung: { text: "Đã sử dụng", color: "yellow" },
  huybo: { text: "Hủy bỏ", color: "red" },
  choxetnghiem: { text: "Chờ xét nghiệm", color: "blue" },
  dangcho: { text: "Đang chờ", color: "gold" },
  dacomau: { text: "Đã có máu", color: "green" },
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
  const [status, setStatus] = useState("dangcho");
  const [error, setError] = useState("");

  // Fetch details and blood units
  const fetchDetails = async () => {
    setLoading(true);
    try {
      const data = await getBloodReceiveRequestDetail(id);
      setRequestDetail(data);
      setStatus(data.trangThai);
      // Lấy máu phù hợp (chỉ khi đang chờ)
      if (data.trangThai === "dangcho") {
        const available = await getAvailableBloodUnitWarehouses(
          data?.nhomMau?.id
        );
        setAvailableWarehouses(available || []);
      } else {
        setAvailableWarehouses([]);
      }
      // Lấy máu đã sử dụng
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

  // Chọn/unselect nhiều kho máu
  const toggleWarehouse = (warehouseId) => {
    setSelectedWarehouses((prev) =>
      prev.includes(warehouseId)
        ? prev.filter((id) => id !== warehouseId)
        : [...prev, warehouseId]
    );
  };

  // Chuyển trạng thái sang 'Đã có máu'
  const handleChangeStatus = async () => {
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

  // Hủy yêu cầu
  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "reject", { ghiChu: note });
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

  // Hoàn thành
  const handleComplete = async () => {
    setActionLoading(true);
    try {
      await updateBloodReceiveRequestStatus(id, "complete", {});
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

  return (
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
        style={{ backgroundColor: "white", borderRadius: 10, marginBottom: 18 }}
        column={2}
      >
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
        <Descriptions.Item label="Nhóm máu">
          {requestDetail?.nguoiNhan.nhomMau.ten}
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
          {new Date(requestDetail?.ngayNhanMauDuKien).toLocaleString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ nhận máu">
          {requestDetail?.diaChiNhanMau}
        </Descriptions.Item>
        <Descriptions.Item label="Kho đơn vị máu">
          {requestDetail?.khoDonViMau?.viTriLuuTru || <i>Chưa chọn</i>}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái kho máu">
          <Tag
            color={statusTagMap[requestDetail?.khoDonViMau?.trangThai]?.color}
          >
            {statusTagMap[requestDetail?.khoDonViMau?.trangThai]?.text}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Form layout="vertical" style={{ marginTop: 8 }}>
        <Form.Item label="Ghi chú">
          <Input.TextArea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú xử lý hoặc lý do hủy..."
          />
        </Form.Item>

        {/* List đơn vị máu phù hợp trong kho */}
        {status === "dangcho" && (
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
                      bodyStyle={{
                        minHeight: 85,
                        padding: 14,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: 15 }}>
                        {wh.viTriLuuTru}
                      </span>
                      <Tag color={statusTagMap[wh.trangThai]?.color}>
                        {statusTagMap[wh.trangThai]?.text}
                      </Tag>
                      <span style={{ fontSize: 13 }}>
                        Ngày lấy:{" "}
                        {wh.ngayLayMau
                          ? new Date(wh.ngayLayMau).toLocaleDateString("vi-VN")
                          : "-"}
                      </span>
                      <span style={{ fontSize: 13 }}>
                        HSD:{" "}
                        {wh.ngayHetHan
                          ? new Date(wh.ngayHetHan).toLocaleDateString("vi-VN")
                          : "-"}
                      </span>
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
        <Form.Item label="Đơn vị máu đã sử dụng cho yêu cầu này">
          <Row gutter={[16, 16]}>
            {usedBloodUnits.length === 0 && (
              <Col>
                <i>Chưa có đơn vị máu nào được sử dụng</i>
              </Col>
            )}
            {usedBloodUnits.map((wh) => (
              <Col key={wh.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  bordered
                  style={{
                    border: "1.5px solid #bdbdbd",
                    borderRadius: 18,
                    background: "#f3f8fd",
                  }}
                  bodyStyle={{
                    minHeight: 70,
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 15 }}>
                    {wh.viTriLuuTru}
                  </span>
                  <Tag color={statusTagMap[wh.trangThai]?.color}>
                    {statusTagMap[wh.trangThai]?.text}
                  </Tag>
                  <span style={{ fontSize: 13 }}>
                    Ngày lấy:{" "}
                    {wh.ngayLayMau
                      ? new Date(wh.ngayLayMau).toLocaleDateString("vi-VN")
                      : "-"}
                  </span>
                  <span style={{ fontSize: 13 }}>
                    HSD:{" "}
                    {wh.ngayHetHan
                      ? new Date(wh.ngayHetHan).toLocaleDateString("vi-VN")
                      : "-"}
                  </span>
                </Card>
              </Col>
            ))}
          </Row>
        </Form.Item>

        <div style={{ textAlign: "right", marginTop: 12 }}>
          <Button
            type="primary"
            loading={actionLoading}
            onClick={handleChangeStatus}
            disabled={status !== "dangcho"}
            style={{
              marginRight: 8,
              background: "#2196F3",
              borderColor: "#2196F3",
              color: "#fff",
            }}
          >
            Chuyển sang "Đã có máu"
          </Button>
          <Button
            danger
            loading={actionLoading}
            onClick={handleCancel}
            style={{ marginRight: 8 }}
          >
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
        </div>
      </Form>
    </Card>
  );
}
