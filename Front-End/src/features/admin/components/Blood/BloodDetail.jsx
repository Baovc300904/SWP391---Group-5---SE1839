import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, message, Descriptions, Tag } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getBloodDetail, updateBlood } from "../../services/bloodService";

// Trạng thái có màu sắc như trong bảng
const statusMap = {
  0: { text: "Tạm dừng", color: "gold" },
  1: { text: "Đang hoạt động", color: "green" },
  2: { text: "Ẩn", color: "red" },
};

export default function BloodDetail() {
  const { id } = useParams();
  const [blood, setBlood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchBlood = async () => {
    setLoading(true);
    try {
      const data = await getBloodDetail(id);
      setBlood(data);
      form.setFieldsValue(data);
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Không lấy được thông tin nhóm máu!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlood();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateBlood(id, values);
      message.success("Cập nhật thành công!");
      setEditMode(false);
      fetchBlood();
    } catch (e) {
      message.error(e?.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  if (!blood)
    return (
      <Card loading={loading} style={{ maxWidth: 600, margin: "40px auto" }} />
    );

  return (
    <Card
      title={
        <span style={{ fontWeight: 700, fontSize: 20, color: "#3f51b5" }}>
          🩸 Chi tiết nhóm máu: {blood.ten || blood.name}
        </span>
      }
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
      }}
      extra={
        <Button onClick={() => navigate(-1)} style={{ borderRadius: 6 }}>
          Quay lại
        </Button>
      }
    >
      {!editMode ? (
        <>
          <Descriptions
            column={1}
            bordered
            size="middle"
            style={{ backgroundColor: "white", borderRadius: 10 }}
          >
            <Descriptions.Item label="Tên nhóm máu">
              {blood.ten || blood.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {blood.mota || blood.description || <i>Chưa có mô tả</i>}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {typeof blood.trangThai !== "undefined" ? (
                <Tag color={statusMap[blood.trangThai]?.color}>
                  {statusMap[blood.trangThai]?.text || "Không rõ"}
                </Tag>
              ) : (
                <span>-</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {blood.ngayTao
                ? new Date(blood.ngayTao).toLocaleString("vi-VN")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {blood.ngayCapNhat
                ? new Date(blood.ngayCapNhat).toLocaleString("vi-VN")
                : "-"}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ textAlign: "right", marginTop: 24 }}>
            <Button
              type="primary"
              style={{
                borderRadius: 6,
                background: "#6200ea",
                borderColor: "#6200ea",
              }}
              onClick={() => setEditMode(true)}
            >
              Chỉnh sửa
            </Button>
          </div>
        </>
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={blood}
          onFinish={handleSubmit}
          style={{
            marginTop: 24,
            padding: 12,
            background: "#fff",
            borderRadius: 16,
          }}
        >
          <Form.Item
            label={<span style={{ color: "#6200ea" }}>Tên nhóm máu</span>}
            name="ten"
            rules={[{ required: true, message: "Nhập tên nhóm máu!" }]}
          >
            <Input
              placeholder="VD: O+, A-, ..."
              style={{
                borderRadius: 30,
                height: 42,
                paddingLeft: 20,
                backgroundColor: "#fefefe",
                border: "1px solid #f1cfd5",
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#6200ea" }}>Mô tả</span>}
            name="mota"
          >
            <Input.TextArea
              placeholder="Thông tin mô tả nhóm máu (nếu có)"
              style={{
                borderRadius: 20,
                padding: 12,
                backgroundColor: "#fefefe",
                border: "1px solid #f1cfd5",
              }}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                marginRight: 12,
                background: "#6200ea",
                borderColor: "#6200ea",
                borderRadius: 30,
                height: 42,
                minWidth: 140,
                fontWeight: "bold",
              }}
            >
              Lưu thay đổi
            </Button>
            <Button
              onClick={() => setEditMode(false)}
              style={{
                borderRadius: 30,
                height: 42,
                minWidth: 100,
              }}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}
