import { Button, Card, Descriptions, message, Table, Tabs, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserBloodDonationHistory,
  getUserBloodReceiveRequests,
  getUserDetail,
} from "../../services/userService";

const roleMap = {
  admin: { label: "Quản trị viên", color: "magenta" },
  nguoidung: { label: "Người dùng", color: "green" },
};
const statusMap = {
  0: { label: "Tạm dừng", color: "orange" },
  1: { label: "Đang hoạt động", color: "green" },
  2: { label: "Ẩn", color: "red" },
};
const bloodStatusMap = {
  dahien: { label: "Đã hiến", color: "green" },
  tuchoi: { label: "Từ chối", color: "red" },
  huy: { label: "Đã huỷ", color: "orange" },
  dangcho: { label: "Đang chờ", color: "blue" },
  // ...bổ sung nếu cần
};
const typeMap = {
  toanphan: { label: "Toàn phần", color: "geekblue" },
  // bổ sung thêm nếu có
};

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // State cho tab lịch sử hiến máu
  const [bloodHistory, setBloodHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [receiveRequests, setReceiveRequests] = useState([]);
  const [receiveLoading, setReceiveLoading] = useState(false);

  const navigate = useNavigate();

  // Lấy thông tin user
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
  // Hàm lấy danh sách yêu cầu nhận máu
  const fetchReceiveRequests = async () => {
    setReceiveLoading(true);
    try {
      const data = await getUserBloodReceiveRequests(id, {
        page: 1,
        trangthai: "dangcho",
      });
      setReceiveRequests(data?.content || []);
    } catch {
      message.error("Không lấy được danh sách yêu cầu nhận máu!");
    } finally {
      setReceiveLoading(false);
    }
  };
  // Lấy lịch sử hiến máu
  const fetchBloodHistory = async () => {
    setHistoryLoading(true);
    try {
      const data = await getUserBloodDonationHistory(id, { page: 1 });
      setBloodHistory(data?.content || []);
    } catch {
      message.error("Không lấy được lịch sử hiến máu!");
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const receiveColumns = [
    {
      title: "Ngày yêu cầu",
      dataIndex: "ngayTao",
      align: "center",
      width: 130,
      render: (v) => (v ? dayjs(v).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Nhóm máu",
      dataIndex: ["nhomMau", "ten"],
      align: "center",
      width: 85,
      render: (v, row) => row.nhomMau?.ten || "-",
    },
    {
      title: "Số lượng (ml)",
      dataIndex: "soLuongDonVi",
      align: "center",
      width: 110,
                      render: (v) => <b style={{ color: "#1976d2" }}>{v}</b>,
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      width: 120,
      render: (v) => (
        <Tag
          color={
            v === "dahoanthanh"
              ? "green"
              : v === "dangcho"
              ? "blue"
              : v === "huy"
              ? "orange"
              : "default"
          }
          style={{ fontWeight: 600, fontSize: 15 }}
        >
          {v === "dahoanthanh"
            ? "Đã hoàn thành"
            : v === "dangcho"
            ? "Đang chờ"
            : v === "huy"
            ? "Đã huỷ"
            : v}
        </Tag>
      ),
    },
    {
      title: "Người duyệt",
      dataIndex: "nguoiDuyet",
      align: "center",
      width: 130,
      render: (u) =>
        u ? (
          <span>
            <b>{u.ten}</b>
            <br />
            <span style={{ color: "#aaa", fontSize: 12 }}>{u.email}</span>
          </span>
        ) : (
          <Tag color="default">Chưa duyệt</Tag>
        ),
    },
    {
      title: "Ngày duyệt",
      dataIndex: "ngayDuyet",
      align: "center",
      width: 110,
      render: (v) => (v ? dayjs(v).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Địa chỉ nhận máu",
      dataIndex: "diaChiNhanMau",
      align: "center",
      width: 160,
      render: (v) => v || "-",
    },
    {
      title: "Lý do",
      dataIndex: "lyDo",
      align: "center",
      width: 130,
      render: (v) => v || <i style={{ color: "#b0b0b0" }}>-</i>,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      align: "center",
      width: 160,
      render: (v) =>
        v ? (
          <span style={{ color: "#555" }}>{v}</span>
        ) : (
          <i style={{ color: "#b0b0b0" }}>-</i>
        ),
    },
  ];

  // Table columns
  const columns = [
    {
      title: "Ngày đăng ký",
      dataIndex: "ngayTao",
      render: (v) => (v ? dayjs(v).format("DD/MM/YYYY") : "-"),
      width: 135,
      align: "center",
    },

    {
      title: "Loại hiến",
      dataIndex: "loaiHien",
      align: "center",
      width: 105,
      render: (v) =>
        v ? (
          <Tag color={typeMap[v]?.color || "default"}>
            {typeMap[v]?.label || v}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Nhóm máu",
      dataIndex: ["nguoiHien", "nhomMau"],
      render: (v, row) => row.nguoiHien?.nhomMau?.ten || "-",
      align: "center",
      width: 90,
    },

    {
      title: "Số lượng (ml)",
      dataIndex: "soLuong",
      align: "center",
      width: 110,
                      render: (v) => <b style={{ color: "#1976d2" }}>{v}</b>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      align: "center",
      width: 120,
      render: (v) => (
        <Tag
          color={bloodStatusMap[v]?.color || "default"}
          style={{ fontWeight: 600, fontSize: 15 }}
        >
          {bloodStatusMap[v]?.label || v}
        </Tag>
      ),
    },
    {
      title: "Người duyệt",
      dataIndex: "nguoiDuyet",
      align: "center",
      width: 140,
      render: (u) =>
        u ? (
          <span>
            <b>{u.ten}</b>
            <br />
            <span style={{ color: "#aaa", fontSize: 12 }}>{u.email}</span>
          </span>
        ) : (
          <Tag color="default">Chưa duyệt</Tag>
        ),
    },
    {
      title: "Ngày duyệt",
      dataIndex: "ngayDuyet",
      align: "center",
      width: 110,
      render: (v) => (v ? dayjs(v).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      align: "center",
      width: 160,
      render: (v) =>
        v ? (
          <span style={{ color: "#555" }}>{v}</span>
        ) : (
          <i style={{ color: "#b0b0b0" }}>-</i>
        ),
    },
  ];

  if (!user) return <Card loading={loading} />;

  return (
    <Card
      title={
        <span style={{ fontWeight: 700, fontSize: 20, color: "#1976d2" }}>
          👤 Chi tiết người dùng: {user.ten}
        </span>
      }
      style={{
        borderRadius: 22,
        boxShadow: "0 6px 24px rgba(0,0,0,0.09)",
        background: "linear-gradient(145deg, #f9f9f9, #ffffff)",
        marginBottom: 24,
      }}
      extra={
        <Button onClick={() => navigate(-1)} style={{ borderRadius: 30 }}>
          Quay lại
        </Button>
      }
      bodyStyle={{ padding: 0, minHeight: 500 }}
    >
      <Tabs
        defaultActiveKey="info"
        tabBarStyle={{
          background: "#fff9fb",
          borderRadius: 14,
          marginBottom: 4,
          paddingLeft: 6,
          fontWeight: 600,
          marginLeft: 24,
        }}
        items={[
          {
            key: "info",
            label: "Thông tin người dùng",
            children: (
              <div style={{ padding: 32 }}>
                <Descriptions
                  column={2}
                  bordered
                  size="middle"
                  layout="vertical"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 16,
                    padding: 24,
                  }}
                  labelStyle={{ fontWeight: 600, color: "#555" }}
                >
                  <Descriptions.Item label="Họ tên">
                    {user.ten}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tên đăng nhập">
                    {user.tenDangNhap}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    {user.soDienThoai}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày sinh">
                    {user.ngaySinh
                      ? new Date(user.ngaySinh).toLocaleDateString("vi-VN")
                      : "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giới tính">
                    {user.gioiTinh === "nam"
                      ? "Nam"
                      : user.gioiTinh === "nu"
                      ? "Nữ"
                      : "Không rõ"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ" span={2}>
                    {user.diaChi || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nhóm máu">
                    {user.nhomMau?.ten || "-"}
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
                  <Descriptions.Item label="Tiền sử bệnh" span={2}>
                    {user.tienSuBenh || <i>Không có</i>}
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
                    {user.ngayTao
                      ? new Date(user.ngayTao).toLocaleString("vi-VN")
                      : "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày cập nhật">
                    {user.ngayCapNhat
                      ? new Date(user.ngayCapNhat).toLocaleString("vi-VN")
                      : "-"}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            ),
          },
          {
            key: "history",
            label: "Lịch sử hiến máu",
            children: (
              <div
                style={{
                  padding: 26,
                  background: "#fff",
                  borderRadius: 18,
                  minHeight: 360,
                  boxShadow: "0 1px 10px #f8bbd060",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={bloodHistory}
                  loading={historyLoading}
                  rowKey="id"
                  pagination={false}
                  bordered
                  size="middle"
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                  }}
                  locale={{ emptyText: "Chưa có lịch sử hiến máu" }}
                  scroll={{ x: true }}
                />
                <Button
                  onClick={fetchBloodHistory}
                  style={{
                    marginTop: 20,
                    borderRadius: 22,
                    background: "#e3f2fd",
                    color: "#1976d2",
                    border: 0,
                    fontWeight: 600,
                  }}
                  loading={historyLoading}
                >
                  Làm mới danh sách
                </Button>
              </div>
            ),
          },
          {
            key: "receive",
            label: "Yêu cầu nhận máu",
            children: (
              <div
                style={{
                  padding: 26,
                  background: "#fff",
                  borderRadius: 18,
                  minHeight: 360,
                }}
              >
                <Table
                  columns={receiveColumns}
                  dataSource={receiveRequests}
                  loading={receiveLoading}
                  rowKey="id"
                  pagination={false}
                  bordered
                  size="middle"
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                  }}
                  locale={{ emptyText: "Chưa có yêu cầu nhận máu" }}
                  scroll={{ x: true }}
                />
                <Button
                  onClick={fetchReceiveRequests}
                  style={{
                    marginTop: 20,
                    borderRadius: 22,
                    background: "#e3f2fd",
                    color: "#1976d2",
                    border: 0,
                    fontWeight: 600,
                  }}
                  loading={receiveLoading}
                >
                  Làm mới danh sách
                </Button>
              </div>
            ),
          },
        ]}
        onChange={(activeKey) => {
          if (activeKey === "history") fetchBloodHistory();
          if (activeKey === "receive") fetchReceiveRequests();
        }}
      />
    </Card>
  );
}
