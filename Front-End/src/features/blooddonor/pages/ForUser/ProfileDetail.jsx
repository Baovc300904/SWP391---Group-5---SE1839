import React from "react";
import { Card, Typography, Descriptions, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const statusMap = {
  0: { text: "Tạm dừng", color: "gold" },
  1: { text: "Đang hoạt động", color: "green" },
  2: { text: "Ẩn", color: "red" },
};

export default function ProfileDetail() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Card
      style={{
        maxWidth: "95%",
        margin: "40px auto",
        borderRadius: 24,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
        padding: 24,
      }}
      title={
        <Title level={3} style={{ color: "#d81b60", marginBottom: 0 }}>
          👤 Thông tin cá nhân
        </Title>
      }
      extra={
        <div style={{ gap: 12, display: "flex" }}>
          <Button
            type="primary"
            onClick={() => navigate("/user/edit-profile")}
            style={{
              borderRadius: 30,
              background: "#d81b60",
              borderColor: "#d81b60",
              height: 40,
              minWidth: 120,
              fontWeight: "bold",
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="primary"
            onClick={() => navigate("/user/change-password")}
            style={{
              borderRadius: 30,
              background: "#6200ea",
              borderColor: "#6200ea",
              height: 40,
              minWidth: 120,
              fontWeight: "bold",
            }}
          >
            Đổi mật khẩu
          </Button>
        </div>
      }
    >
      <Descriptions
        bordered
        column={2}
        style={{ backgroundColor: "#fff", borderRadius: 16 }}
        size="middle"
      >
        <Descriptions.Item label="Họ và tên" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }}>
          {user?.ten}
        </Descriptions.Item>
        <Descriptions.Item label="Tên đăng nhập">
          {user.tenDangNhap}
        </Descriptions.Item>
        <Descriptions.Item label="Email" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }}>
          {user?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }}>
          {user?.soDienThoai}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }}>
          {user?.ngaySinh}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }}>
          {user?.gioiTinh}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }} span={2}>
          {user?.diaChi}
        </Descriptions.Item>
        <Descriptions.Item label="Nhóm máu" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }}>
          <Tag color="red">{user?.nhomMau?.ten || "-"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Yếu tố Rh">
          <Tag color={user.yeuToRh === "+" ? "green" : "volcano"}>
            {user.yeuToRh}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tiền sử bệnh" styles={{ label: { width: 160, fontWeight: 500 }, content: { fontSize: 15 } }} span={2}>
          {user?.tienSuBenh || <i>Không có</i>}
        </Descriptions.Item>
        <Descriptions.Item label="Cân nặng">
          {user.canNang} kg
        </Descriptions.Item>
        <Descriptions.Item label="Chiều cao">
          {user.chieuCao} cm
        </Descriptions.Item>
        <Descriptions.Item label="Vai trò">{user.vaiTro}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusMap[user.trangThai]?.color}>
            {statusMap[user.trangThai]?.text || "Không xác định"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {new Date(user.ngayTao).toLocaleString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {new Date(user.ngayCapNhat).toLocaleString("vi-VN")}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
