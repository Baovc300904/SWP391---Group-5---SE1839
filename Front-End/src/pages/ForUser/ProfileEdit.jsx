import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  message,
  Card,
  Typography,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { updateProfile } from "../../services/userService";
import { getBloods } from "../../services/bloodService";

const { Title } = Typography;

export default function ProfileEdit() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [bloodOptions, setBloodOptions] = useState([]);

  useEffect(() => {
    async function fetchBloods() {
      try {
        const res = await getBloods();
        setBloodOptions(res || []);
      } catch {
        message.error("Không tải được nhóm máu!");
      }
    }
    fetchBloods();
  }, []);

  // CHUẨN HÓA INITIAL VALUES ĐÚNG FIELD BACKEND
  const initialValues = {
    ten: user.ten,
    tendangnhap: user.tenDangNhap,
    email: user.email,
    sodienthoai: user.soDienThoai,
    ngaysinh: user.ngaySinh ? dayjs(user.ngaySinh) : null,
    gioitinh: user.gioiTinh,
    diachi: user.diaChi,
    nhommau: user.nhomMau?.id,
    yeutorh: user.yeuToRh,
    tiensubenh: user.tienSuBenh,
    cannang: user.canNang,
    chieucao: user.chieuCao,
  };

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        ngaysinh: values.ngaysinh.format("YYYY-MM-DD"),
        nhommau: { id: values.nhommau },
      };
      await updateProfile(payload);
      // Cập nhật lại localStorage đúng chuẩn
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...payload,
          nhommau: bloodOptions.find((b) => b.id === values.nhommau),
        })
      );
      message.success("Cập nhật hồ sơ thành công!");
      navigate("/profile");
    } catch (err) {
      message.error(err?.message || "Cập nhật thất bại!");
    }
  };

  const inputStyle = {
    borderRadius: 30,
    height: 42,
    paddingLeft: 16,
    backgroundColor: "#fefefe",
    border: "1px solid #f1cfd5",
  };

  return (
    <Card
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        borderRadius: 24,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
        padding: 24,
      }}
    >
      <Title level={3} style={{ color: "#d81b60", marginBottom: 24 }}>
        ✏️ Chỉnh sửa hồ sơ cá nhân
      </Title>

      <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={24}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Họ tên" name="ten" rules={[{ required: true }]}>
              <Input placeholder="Nguyễn Văn A" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Tên đăng nhập"
              name="tendangnhap"
              rules={[{ required: true }]}
            >
              <Input placeholder="username" style={inputStyle} disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="email@example.com" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Số điện thoại" name="sodienthoai">
              <Input placeholder="0123456789" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Ngày sinh" name="ngaysinh">
              <DatePicker
                format="YYYY-MM-DD"
                style={{ ...inputStyle, width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Giới tính" name="gioitinh">
              <Select
                style={{ ...inputStyle, width: "100%" }}
                options={[
                  { value: "nam", label: "Nam" },
                  { value: "nữ", label: "Nữ" },
                  { value: "khác", label: "Khác" },
                ]}
                placeholder="Chọn giới tính"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Địa chỉ" name="diachi">
              <Input placeholder="123 Lê Lợi, TP.HCM" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Nhóm máu"
              name="nhommau"
              rules={[{ required: true, message: "Vui lòng chọn nhóm máu" }]}
            >
              <Select
                placeholder="Chọn nhóm máu"
                style={{ ...inputStyle, width: "100%" }}
              >
                {bloodOptions.map((b) => (
                  <Select.Option key={b.id} value={b.id}>
                    {b.ten}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Yếu tố Rh" name="yeutorh">
              <Select
                placeholder="Chọn Rh"
                style={{ ...inputStyle, width: "100%" }}
                options={[
                  { value: "+", label: "Rh+" },
                  { value: "-", label: "Rh-" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Cân nặng (kg)" name="cannang">
              <InputNumber
                min={30}
                style={{ ...inputStyle, width: "100%" }}
                placeholder="VD: 60"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Chiều cao (cm)" name="chieucao">
              <InputNumber
                min={100}
                style={{ ...inputStyle, width: "100%" }}
                placeholder="VD: 170"
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Tiền sử bệnh" name="tiensubenh">
              <Input placeholder="Không có" style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              borderRadius: 30,
              height: 42,
              minWidth: 160,
              background: "#d81b60",
              borderColor: "#d81b60",
              fontWeight: "bold",
            }}
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
