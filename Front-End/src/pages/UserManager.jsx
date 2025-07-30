import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Card,
  Tag,
  Tooltip,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
} from "antd";
import { getUsers, deleteUser, createEmployee } from "../services/userService";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// Trạng thái hoạt động
const statusMap = {
  0: { label: "Tạm dừng", color: "#ff9800" },
  1: { label: "Đang hoạt động", color: "#43a047" },
  2: { label: "Ẩn", color: "#b0bec5" },
};

const workStatusOptions = [
  { value: "danglamviec", label: "Đang làm việc" },
  { value: "nghiviec", label: "Nghỉ việc" },
  { value: "tamnghi", label: "Tạm nghỉ" },
];

// Filter options for user role
const userRoleOptions = [
  { value: "nguoidung", label: "Người dùng" },
  { value: "nhanvien", label: "Nhân viên" },
  { value: "admin", label: "Admin" },
];

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [roleFilter, setRoleFilter] = useState("nguoidung"); // Role filter state
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchUsers = async (role = "nguoidung") => {
    setLoading(true);
    try {
      const data = await getUsers(1, role);
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
      fetchUsers(roleFilter);
    } catch (e) {
      message.error(e?.response?.data?.message || "Xoá người dùng thất bại!");
    }
  };

  useEffect(() => {
    fetchUsers(roleFilter);
    // eslint-disable-next-line
  }, [roleFilter]);

  const handleCreateEmployee = async (values) => {
    setSubmitting(true);
    try {
      const data = {
        ...values,
        ngaysinh: values.ngaySinh
          ? dayjs(values.ngaySinh).format("YYYY-MM-DD")
          : undefined,
        ngayVaoLam: values.ngayVaoLam
          ? dayjs(values.ngayVaoLam).format("YYYY-MM-DD")
          : undefined,
        tendangnhap: values.tenDangNhap,
        matkhau: values.matKhau,
        sodienthoai: values.soDienThoai,
        diachi: values.diaChi,
        gioitinh: values.gioiTinh,
      };
      await createEmployee(data);
      message.success("Tạo nhân viên thành công!");
      setModalVisible(false);
      form.resetFields();
      fetchUsers(roleFilter);
    } catch (err) {
      message.error(
        err?.response?.data?.message ||
          err?.message ||
          "Tạo nhân viên thất bại!"
      );
    } finally {
      setSubmitting(false);
    }
  };

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
        <div style={{ display: "flex", gap: 16 }}>
          <Select
            style={{ minWidth: 170 }}
            value={roleFilter}
            onChange={setRoleFilter}
            options={userRoleOptions}
            allowClear={false}
            suffixIcon={<FilterOutlined />}
            placeholder="Loại người dùng"
          />
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            style={{
              borderRadius: 8,
              fontWeight: 600,
              background: "#1565c0",
              borderColor: "#1565c0",
            }}
            onClick={() => setModalVisible(true)}
          >
            Thêm nhân viên
          </Button>
        </div>
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

      {/* Modal thêm nhân viên */}
      <Modal
        title="Thêm nhân viên mới"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateEmployee}
          initialValues={{
            gioiTinh: "nam",
            trangThaiLamViec: "danglamviec",
          }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên nhân viên"
                name="ten"
                rules={[{ required: true, message: "Nhập tên nhân viên!" }]}
              >
                <Input placeholder="VD: Nguyễn Văn A" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="tenDangNhap"
                rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}
              >
                <Input placeholder="Tên đăng nhập duy nhất" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mật khẩu"
                name="matKhau"
                rules={[{ required: true, message: "Nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="example@gmail.com" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại"
                name="soDienThoai"
                rules={[
                  { required: true, message: "Nhập số điện thoại!" },
                  {
                    pattern: /^\d{10,11}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Ngày sinh"
                name="ngaySinh"
                rules={[{ required: true, message: "Chọn ngày sinh!" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày sinh"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Giới tính"
                name="gioiTinh"
                rules={[{ required: true, message: "Chọn giới tính!" }]}
              >
                <Select>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nu">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Địa chỉ"
                name="diaChi"
                rules={[{ required: true, message: "Nhập địa chỉ!" }]}
              >
                <Input placeholder="Địa chỉ thường trú" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Ngày vào làm"
                name="ngayVaoLam"
                rules={[{ required: true, message: "Chọn ngày vào làm!" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày vào làm"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mã số nhân viên"
                name="maSoNhanVien"
                rules={[{ required: true, message: "Nhập mã số nhân viên!" }]}
              >
                <Input placeholder="Mã nhân viên duy nhất" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Chức vụ"
                name="chucVu"
                rules={[{ required: true, message: "Nhập chức vụ!" }]}
              >
                <Input placeholder="Chức vụ" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phòng ban"
                name="phongBan"
                rules={[{ required: true, message: "Nhập phòng ban!" }]}
              >
                <Input placeholder="Phòng ban" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Trạng thái làm việc"
                name="trangThaiLamViec"
                rules={[
                  { required: true, message: "Chọn trạng thái làm việc!" },
                ]}
              >
                <Select options={workStatusOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              style={{
                borderRadius: 8,
                fontWeight: 600,
                minWidth: 120,
              }}
            >
              Thêm mới
            </Button>
            <Button
              style={{
                borderRadius: 8,
                marginLeft: 16,
                minWidth: 100,
              }}
              onClick={() => {
                setModalVisible(false);
                form.resetFields();
              }}
              disabled={submitting}
            >
              Huỷ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
