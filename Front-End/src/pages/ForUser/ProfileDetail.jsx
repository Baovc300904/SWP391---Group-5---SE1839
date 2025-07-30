import React from "react";
import { Card, Typography, Descriptions, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "./ProfileDetail.css";

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
    <div className="profile-detail-section">
      {/* Background Elements */}
      <div className="profile-background">
        <div className="floating-profile-heart profile-heart-1"></div>
        <div className="floating-profile-heart profile-heart-2"></div>
      </div>

      <div className="profile-container">
        <Card
          className="profile-card"
          title={
            <Title level={3} className="profile-title">
              👤 Thông tin cá nhân
            </Title>
          }
          extra={
            <div style={{ gap: 12, display: "flex" }}>
              <Button
                type="primary"
                onClick={() => navigate("/user/edit-profile")}
                className="profile-edit-button"
              >
                Chỉnh sửa
              </Button>
              <Button
                type="primary"
                onClick={() => navigate("/user/change-password")}
                className="profile-password-button"
              >
                Đổi mật khẩu
              </Button>
            </div>
          }
        >
      <Descriptions
        bordered
        column={2}
        labelStyle={{ width: 160, fontWeight: 500 }}
        contentStyle={{ fontSize: 15 }}
        className="profile-descriptions"
        size="middle"
      >
        <Descriptions.Item label="Họ tên">{user.ten}</Descriptions.Item>
        <Descriptions.Item label="Tên đăng nhập">
          {user.tenDangNhap}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {user.soDienThoai}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">{user.ngaySinh}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">{user.gioiTinh}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{user.diaChi}</Descriptions.Item>
        <Descriptions.Item label="Nhóm máu">
          <Tag className="profile-blood-tag">{user.nhomMau?.ten || "-"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Yếu tố Rh">
          <Tag className={user.yeuToRh === "+" ? "profile-rh-positive" : "profile-rh-negative"}>
            {user.yeuToRh}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tiền sử bệnh" span={2}>
          {user.tienSuBenh || <i>Không có</i>}
        </Descriptions.Item>
        <Descriptions.Item label="Cân nặng">
          {user.canNang} kg
        </Descriptions.Item>
        <Descriptions.Item label="Chiều cao">
          {user.chieuCao} cm
        </Descriptions.Item>
        <Descriptions.Item label="Vai trò">{user.vaiTro}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag className="profile-blood-tag">
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
      </div>
    </div>
  );
}
