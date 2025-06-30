import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Card, Tag, Tooltip } from "antd";
import { getUsers, deleteUser } from "../../services/api/userService";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

// Trạng thái hoạt động
const statusMap = {
  0: { label: "Tạm dừng", color: "orange" },
  1: { label: "Đang hoạt động", color: "green" },
  2: { label: "Ẩn", color: "red" },
};

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers(1, "nguoidung");
      setUsers(data?.content || []);
    } catch (err) {
      message.error(err?.message || "Lỗi khi lấy danh sách user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Xoá user thành công!");
      fetchUsers();
    } catch {
      message.error("Xoá user thất bại!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "Tên người dùng",
      dataIndex: "ten",
      render: (text, record) => (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/users-manager/detail/${record.id}`)}
        >
          {text || record.tenDangNhap}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      render: (v) =>
        v === "nam" ? "Nam" : v === "nu" ? "Nữ" : <i>Không rõ</i>,
    },
    {
      title: "Nhóm máu",
      dataIndex: ["nhomMau", "ten"],
      render: (value, record) => record.nhomMau?.ten || "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      render: (val) => {
        const status = statusMap[val] || {
          label: "Không rõ",
          color: "default",
        };
        return <Tag color={status.color}>{status.label}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => navigate(`/users-manager/detail/${record.id}`)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title={
        <span style={{ fontWeight: 700, fontSize: 20, color: "#3f51b5" }}>
          👥 Danh sách người dùng
        </span>
      }
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        borderRadius: 20,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
      }}
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={false}
        bordered={false}
        scroll={{ x: true }}
      />
    </Card>
  );
}
