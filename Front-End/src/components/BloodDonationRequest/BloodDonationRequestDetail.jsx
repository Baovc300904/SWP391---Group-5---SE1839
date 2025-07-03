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
} from "@ant-design/icons";

// Mapping status to color
const statusMap = {
  dangcho: { text: "Đang chờ", color: "gold" }, // Yellow
  tuchoi: { text: "Từ chối", color: "red" }, // Red
  huy: { text: "Hủy", color: "gray" }, // Gray
  xacnhan: { text: "Xác nhận", color: "blue" }, // Gray
  dahien: { text: "Đã hiến", color: "green" }, // Blue
};

export default function BloodRequestDetail() {
  const { id } = useParams(); // Get the ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestDetail, setRequestDetail] = useState(null);
  const [note, setNote] = useState(""); // Note for approve, reject, complete
  const [error, setError] = useState(""); // Error handling state
  const fetchRequestDetail = async () => {
    setLoading(true);
    try {
      const data = await getBloodRequestDetail(id);
      setRequestDetail(data);
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

  const handleReject = async () => {
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

  const handleComplete = async () => {
    if (!note) {
      message.error("Bạn cần nhập ghi chú khi hoàn thành yêu cầu.");
      return;
    }
    setLoading(true);
    try {
      await completeRequest(id, { viTriLuuTru: note });
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

  return (
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
      >
        <Descriptions.Item label="Tên người hiến">
          {requestDetail?.nguoiHien.ten}
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

      <Form layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item label="Ghi chú" name="ghiChu">
          <Input.TextArea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nhập ghi chú cho yêu cầu"
            rows={4}
            style={{
              borderRadius: 8,
              borderColor: "#ccc",
              fontSize: 14,
              padding: "10px",
            }}
          />
        </Form.Item>

        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleApprove}
            style={{
              marginRight: 8,
              backgroundColor:
                requestDetail?.trangThai === "dangcho" ? "#4CAF50" : "#ccc",
              borderColor:
                requestDetail?.trangThai === "dangcho" ? "#4CAF50" : "#ccc",
              color: requestDetail?.trangThai === "dangcho" ? "#fff" : "#666",
            }}
            disabled={requestDetail?.trangThai !== "dangcho"}
          >
            Duyệt
          </Button>
          <Button
            type="danger"
            icon={<CloseCircleOutlined />}
            onClick={handleReject}
            style={{
              marginRight: 8,
              backgroundColor:
                requestDetail?.trangThai === "dangcho" ? "#f44336" : "#ccc",
              borderColor:
                requestDetail?.trangThai === "dangcho" ? "#f44336" : "#ccc",
              color: requestDetail?.trangThai === "dangcho" ? "#fff" : "#666",
            }}
            disabled={requestDetail?.trangThai !== "dangcho"}
          >
            Từ chối
          </Button>
          <Button
            type="default"
            icon={<SaveOutlined />}
            onClick={handleComplete}
            style={{
              marginLeft: 8,
              backgroundColor:
                requestDetail?.trangThai === "xacnhan" ? "#2196F3" : "#ccc",
              borderColor:
                requestDetail?.trangThai === "xacnhan" ? "#2196F3" : "#ccc",
              color: requestDetail?.trangThai === "xacnhan" ? "#fff" : "#666",
            }}
            disabled={requestDetail?.trangThai !== "xacnhan"}
          >
            Hoàn thành
          </Button>
        </div>
      </Form>
    </Card>
  );
}
