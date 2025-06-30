import React, { useEffect, useState } from "react";
import { getBloods, createBlood, deleteBlood } from "../../services/api/bloodService";
import {
  Card,
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Tag,
  Tooltip,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const statusMap = {
  0: { text: "Tạm dừng", color: "gold" }, // Yellow
  1: { text: "Đang hoạt động", color: "green" }, // Green
  2: { text: "Ẩn", color: "red" }, // Red
};

export default function BloodManager() {
  const [bloods, setBloods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchBloods = async () => {
    setLoading(true);
    try {
      const data = await getBloods();
      setBloods(data || []);
    } catch (e) {
      message.error(e?.response?.data?.message || "Lỗi lấy danh sách nhóm máu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloods();
  }, []);

  const handleAddBlood = async (values) => {
    setAddLoading(true);
    try {
      await createBlood(values);
      message.success("Thêm nhóm máu thành công!");
      setAddModal(false);
      form.resetFields();
      fetchBloods();
    } catch (e) {
      message.error(e?.response?.data?.message || "Thêm nhóm máu thất bại!");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlood(id);
      message.success("Xóa nhóm máu thành công!");
      fetchBloods();
    } catch (e) {
      message.error(e?.response?.data?.messa || "Xóa thất bại!");
    }
  };

  // TABLE columns dùng đúng trường API
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Tên nhóm máu",
      dataIndex: "ten",
      render: (name, record) => (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/bloods-manager/${record.id}`)}
        >
          {name}
        </Button>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      render: (desc) => desc || <i>Chưa có mô tả</i>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (v) => {
        const status = statusMap[v] || { text: "Không rõ", color: "gray" };
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      render: (val) => (val ? new Date(val).toLocaleString("vi-VN") : "-"),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      render: (val) => (val ? new Date(val).toLocaleString("vi-VN") : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => navigate(`/bloods-manager/${record.id}`)}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn chắc chắn muốn xóa nhóm máu này?"
              onConfirm={() => handleDelete(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button icon={<DeleteOutlined />} danger size="small" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card
      title={
        <span style={{ fontWeight: 700, fontSize: 20, color: "#3f51b5" }}>
          🩸 Quản lý nhóm máu
        </span>
      }
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
        overflow: "hidden",
      }}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAddModal(true)}
          style={{
            borderRadius: 8,
            background: "#6200ea",
            borderColor: "#6200ea",
          }}
        >
          Thêm nhóm máu
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={bloods}
        pagination={false}
        bordered={false}
        style={{ marginTop: 16 }}
        scroll={{ x: true }}
        rowClassName={() => "custom-row"}
      />

      <Modal
        title={
          <span style={{ fontWeight: 600, fontSize: 20, color: "#6200ea" }}>
            Thêm nhóm máu mới
          </span>
        }
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
        centered
        style={{ borderRadius: 16 }}
        bodyStyle={{ marginTop: 24 }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddBlood}
          preserve={false}
        >
          <Form.Item
            label={<span style={{ color: "#6200ea" }}>Tên nhóm máu</span>}
            name="ten"
            rules={[{ required: true, message: "Nhập tên nhóm máu!" }]}
          >
            <Input
              placeholder="VD: O+, AB-, ..."
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

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              loading={addLoading}
              style={{
                width: "100%",
                background: "#6200ea",
                borderColor: "#6200ea",
                borderRadius: 30,
                height: 42,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
