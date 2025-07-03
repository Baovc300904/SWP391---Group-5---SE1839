import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlood, deleteBlood, getBloods } from "../services/bloodService";

// Status mapping
const statusMap = {
  0: { text: "Tạm dừng", color: "#FF6F61" }, // Coral
  1: { text: "Đang hoạt động", color: "#4CAF50" }, // Green
  2: { text: "Ẩn", color: "#B0BEC5" }, // Light Grey
};

export default function BloodManager() {
  const [bloods, setBloods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch all Bloods
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

  // Handle adding a new blood group
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

  // Handle deleting a blood group
  const handleDelete = async (id) => {
    try {
      await deleteBlood(id);
      message.success("Xóa nhóm máu thành công!");
      fetchBloods();
    } catch (e) {
      message.error(e?.response?.data?.message || "Xóa nhóm máu thất bại!");
    }
  };

  // Table columns
  const columns = [
    { title: "#", dataIndex: "id" },
    {
      title: "Tên nhóm máu",
      dataIndex: "ten",
      render: (name, record) => (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/employee/bloods-manager/${record.id}`)}
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
        const status = statusMap[v] || { text: "Không rõ", color: "#9E9E9E" };
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
              onClick={() => navigate(`/employee/bloods-manager/${record.id}`)}
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
      title="🩸 Quản lý nhóm máu"
      style={{
        borderRadius: 20,
        overflow: "hidden",
      }}
      extra={
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModal(true)}
            style={{
              marginLeft: 10,
              borderRadius: 8,
              background: "#6200ea",
              borderColor: "#6200ea",
            }}
          >
            Thêm nhóm máu
          </Button>
        </div>
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

      {/* Modal for adding new blood group */}
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
