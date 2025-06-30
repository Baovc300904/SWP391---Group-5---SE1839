import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Tag, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetail } from "../../services/userService";

const roleMap = {
  admin: { label: "Quản trị viên", color: "magenta" },
  nguoidung: { label: "Người dùng", color: "green" },
};

const statusMap = {
  0: { label: "Tạm dừng", color: "orange" },
  1: { label: "Đang hoạt động", color: "green" },
  2: { label: "Ẩn", color: "red" },
};

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getUserDetail(id);
      setUser(data);
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Không lấy được thông tin người dùng!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) return <Card loading={loading} style={{ margin: "40px auto" }} />;

  return (
    <Card
      title={
        <span style={{ fontWeight: 700, fontSize: 20, color: "#e91e63" }}>
          👤 Chi tiết người dùng: {user.ten}
        </span>
      }
      style={{
        margin: "40px auto",
        borderRadius: 20,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
      }}
      extra={
        <Button onClick={() => navigate(-1)} style={{ borderRadius: 30 }}>
          Quay lại
        </Button>
      }
      bodyStyle={{ padding: 32 }}
    >
      <Descriptions
        bordered
        column={2}
        size="middle"
        layout="vertical"
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <Descriptions.Item label="Họ và tên" styles={{ label: { fontWeight: 600, color: "#555" } }}>
          {user?.ten}
        </Descriptions.Item>
        <Descriptions.Item label="Tên đăng nhập">
          {user.tenDangNhap}
        </Descriptions.Item>

        <Descriptions.Item label="Email" styles={{ label: { fontWeight: 600, color: "#555" } }}>
          {user?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" styles={{ label: { fontWeight: 600, color: "#555" } }}>
          {user?.soDienThoai}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày sinh" styles={{ label: { fontWeight: 600, color: "#555" } }}>
          {user?.ngaySinh}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính" styles={{ label: { fontWeight: 600, color: "#555" } }}>
          {user?.gioiTinh}
        </Descriptions.Item>

        <Descriptions.Item label="Địa chỉ" styles={{ label: { fontWeight: 600, color: "#555" } }} span={2}>
          {user?.diaChi}
        </Descriptions.Item>

        <Descriptions.Item label="Nhóm máu" styles={{ label: { fontWeight: 600, color: "#555" } }}>
          {user?.nhomMau}
        </Descriptions.Item>
        <Descriptions.Item label="Yếu tố Rh">
          {user.yeuToRh || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Chiều cao (cm)">
          {user.chieuCao || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Cân nặng (kg)">
          {user.canNang || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Tiền sử bệnh" styles={{ label: { fontWeight: 600, color: "#555" } }} span={2}>
          {user?.tienSuBenh}
        </Descriptions.Item>

        <Descriptions.Item label="Vai trò">
          <Tag color={roleMap[user.vaiTro]?.color || "default"}>
            {roleMap[user.vaiTro]?.label || user.vaiTro}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusMap[user.trangThai]?.color || "default"}>
            {statusMap[user.trangThai]?.label || "Không rõ"}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Ngày tạo">
          {user.ngayTao ? new Date(user.ngayTao).toLocaleString("vi-VN") : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {user.ngayCapNhat
            ? new Date(user.ngayCapNhat).toLocaleString("vi-VN")
            : "-"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
