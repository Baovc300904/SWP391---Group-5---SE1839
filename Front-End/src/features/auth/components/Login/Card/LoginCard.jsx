import { Card, Form, Input, Button, message } from "antd";
import "./LoginCard.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../../services/api/authService";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const redirectTo = (role) => {
    const normalized = role?.toLowerCase();
    switch (normalized) {
      case "admin":
        return "/admin";
      case "nguoidung":
        return "/user/home";
      default:
        return "/";
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        tendangnhap: values.username,
        matkhau: values.password,
      };
      const response = await login(data);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        authLogin(response.user, response.token);
        message.success("Đăng nhập thành công!");
        navigate(redirectTo(response.user.vaiTro));
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Tên đăng nhập hoặc mật khẩu không đúng!"
      );
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { color: "#333", fontWeight: 500 };
  const inputStyle = {
    borderRadius: 20,
    height: 42,
    paddingLeft: 16,
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Card
        style={{
          width: 480,
          borderRadius: 20,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
        variant="borderless"
        styles={{
          header: {
            background: "#e53935",
            color: "#fff",
            textAlign: "center",
            padding: "14px 0",
            fontSize: 22,
            fontWeight: "bold",
            borderRadius: "16px 16px 0 0",
            letterSpacing: 1,
          },
          body: {
            padding: 32,
            backgroundColor: "#f9fbfd",
            borderRadius: "0 0 20px 20px",
          },
        }}
        title="ĐĂNG NHẬP"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span style={labelStyle}>Tên đăng nhập</span>}
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Nhập tên đăng nhập" style={inputStyle} />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>Mật khẩu</span>}
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="••••••" style={inputStyle} />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              htmlType="submit"
              type="primary"
              block
              loading={loading}
              style={{
                height: 48,
                borderRadius: 30,
                background: "#e53935",
                borderColor: "#e53935",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            Chưa có tài khoản?{" "}
            <a href="/register" style={{ color: "#1565c0" }}>
              Đăng ký tại đây
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
