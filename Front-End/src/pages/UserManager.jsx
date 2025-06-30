import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Card, Tag, Tooltip } from "antd";
import { getUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

// Trạng thái hoạt động
const statusMap = {
  0: { label: "Tạm dừng", color: "#ff9800" }, // Orange
  1: { label: "Đang hoạt động", color: "#43a047" }, // Green
  2: { label: "Ẩn", color: "#b0bec5" }, // Light Gray
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
      message.error(
        err?.response?.data?.message ||
          err?.message ||
          "Lỗi khi lấy danh sách người dùng!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Xoá người dùng thành công!");
      fetchUsers();
    } catch (e) {
      message.error(e?.response?.data?.message || "Xoá người dùng thất bại!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      align: "center",
      width: 60,
    },
    {
      title: "Tên người dùng",
      dataIndex: "ten",
      render: (text, record) => (
        <Button
          type="link"
          style={{ padding: 0, fontWeight: 600 }}
          onClick={() => navigate(`/admin/users-manager/detail/${record.id}`)}
        >
          {text || record.tenDangNhap}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (v) => v || <i>Chưa cập nhật</i>,
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      align: "center",
      render: (v) =>
        v === "nam" ? "Nam" : v === "nu" ? "Nữ" : <i>Không rõ</i>,
    },
    {
      title: "Nhóm máu",
      dataIndex: ["nhomMau", "ten"],
      align: "center",
      render: (_, record) =>
        record.nhomMau?.ten ? (
          <Tag color="#d32f2f" style={{ borderRadius: 10 }}>
            {record.nhomMau.ten}
          </Tag>
        ) : (
          <Tag color="#e0e0e0" style={{ borderRadius: 10 }}>
            -
          </Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      render: (val) => {
        const status = statusMap[val] || {
          label: "Không rõ",
          color: "#9e9e9e",
        };
        return (
          <Tag
            color={status.color}
            style={{
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 13,
              padding: "2px 14px",
            }}
          >
            {status.label}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() =>
                navigate(`/admin/users-manager/detail/${record.id}`)
              }
              style={{ borderRadius: 8, background: "#fff" }}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"
              style={{ borderRadius: 8 }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title="👥 Danh sách người dùng"
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(41, 92, 206, 0.10)",
        overflow: "hidden",
      }}
      extra={
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          style={{
            borderRadius: 8,
            fontWeight: 600,
            background: "#1565c0",
            borderColor: "#1565c0",
          }}
          onClick={() =>
            message.info("Tính năng thêm mới sẽ có trong bản tiếp theo!")
          }
        >
          Thêm người dùng
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={false}
        bordered={false}
        style={{ marginTop: 16 }}
        scroll={{ x: true }}
      />
    </Card>
  );
}
