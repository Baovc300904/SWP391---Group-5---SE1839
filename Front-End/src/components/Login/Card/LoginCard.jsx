import { Card, Form, Input, Button, message } from "antd";
import "./LoginCard.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

export default function LoginCard() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const data = {
        tendangnhap: values.username,
        matkhau: values.password,
      };
      const response = await login(data);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        message.success("Đăng nhập thành công!");
        const role = response?.user?.vaiTro;
        navigate(
          role === "admin"
            ? "/admin"
            : role === "nhanvien"
            ? "/employee/bloods-manager"
            : "/user"
        );
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Tên đăng nhập hoặc mật khẩu không đúng!"
      );
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
        styles={{
          body: {
            padding: 32,
            backgroundColor: "#f9fbfd",
            borderRadius: "0 0 20px 20px",
          },
          header: { padding: 0 }
        }}
        variant="outlined"
        title={
          <div
            style={{
              background: "#e53935",
              color: "#fff",
              textAlign: "center",
              padding: 14,
              fontSize: 22,
              fontWeight: "bold",
              borderRadius: "16px 16px 0 0",
              letterSpacing: 1,
            }}
          >
            ĐĂNG NHẬP
          </div>
        }
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
