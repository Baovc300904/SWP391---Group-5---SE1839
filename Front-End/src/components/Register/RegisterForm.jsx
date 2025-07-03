import {
  Card,
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  DatePicker,
  Select,
  Slider,
  Steps,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Card/LoginCard.css";
import { register } from "../../services/authService";
import { getBloods } from "../../services/bloodService";

const { Option } = Select;
const { Step } = Steps;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [bloodOptions, setBloodOptions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

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

  const onFinish = async (values) => {
    try {
      const payload = {
        ten: values.ten,
        tendangnhap: values.tenDangNhap,
        matkhau: values.matKhau,
        email: values.email,
        sodienthoai: values.soDienThoai,
        ngaysinh: values.ngaySinh.format("YYYY-MM-DD"),
        gioitinh: values.gioiTinh,
        diachi: values.diaChi,
        nhommau: values.nhomMau,
        yeutorh: values.rh,
        tiensubenh: values.tienSuBenh || "Không có",
        cannang: parseFloat(values.canNang),
        chieucao: parseFloat(values.chieuCao),
      };
      await register(payload);
      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      message.error(error?.message || "Đăng ký thất bại!");
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

  const stepDisplay = (step) => ({
    display: currentStep === step ? "block" : "none",
  });

  const next = async () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        overflow: "auto",
      }}
    >
      <Card
        style={{
          width: 1000,
          maxWidth: "100%",
          borderRadius: 20,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{
          padding: 32,
          backgroundColor: "#f9fbfd",
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: "0 0 20px 20px",
          minHeight: 600,
        }}
        bordered={false}
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
            ĐĂNG KÝ NGƯỜI DÙNG
          </div>
        }
        headStyle={{ padding: 0 }}
      >
        <Steps
          current={currentStep}
          style={{ marginBottom: 24 }}
          items={[
            { title: "Tài khoản" },
            { title: "Thông tin cá nhân" },
            { title: "Thể trạng" },
          ]}
        />

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            {/* Step 0 */}
            <Col xs={24} style={stepDisplay(0)}>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Tên đăng nhập</span>}
                    name="tenDangNhap"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input placeholder="username" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Mật khẩu</span>}
                    name="matKhau"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu" },
                      { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                    ]}
                  >
                    <Input.Password placeholder="••••••" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={<span style={labelStyle}>Xác nhận mật khẩu</span>}
                    name="confirm"
                    dependencies={["matKhau"]}
                    rules={[
                      { required: true, message: "Vui lòng nhập lại mật khẩu" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("matKhau") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Mật khẩu không khớp!");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Nhập lại mật khẩu"
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Step 1 */}
            <Col xs={24} style={stepDisplay(1)}>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Họ tên</span>}
                    name="ten"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ tên" },
                    ]}
                  >
                    <Input placeholder="Nguyễn Văn A" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Email</span>}
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { type: "email", message: "Email không hợp lệ" },
                    ]}
                  >
                    <Input placeholder="email@example.com" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Số điện thoại</span>}
                    name="soDienThoai"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input placeholder="0123456789" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Ngày sinh</span>}
                    name="ngaySinh"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày sinh" },
                    ]}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      style={{ ...inputStyle, width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Giới tính</span>}
                    name="gioiTinh"
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tính" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn giới tính"
                      style={{ ...inputStyle, width: "100%" }}
                      className="rounded-select"
                    >
                      <Option value="nam">Nam</Option>
                      <Option value="nu">Nữ</Option>
                      <Option value="khac">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={<span style={labelStyle}>Địa chỉ</span>}
                    name="diaChi"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ" },
                    ]}
                  >
                    <Input
                      placeholder="123 Lê Lợi, TP.HCM"
                      style={inputStyle}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Step 2 */}
            <Col xs={24} style={stepDisplay(2)}>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Nhóm máu</span>}
                    name="nhomMau"
                    rules={[
                      { required: true, message: "Vui lòng chọn nhóm máu" },
                    ]}
                  >
                    <Select
                      className="rounded-select"
                      placeholder="Chọn nhóm máu"
                      style={{ ...inputStyle, width: "100%" }}
                      showSearch
                      optionFilterProp="children"
                    >
                      {bloodOptions.map((b) => (
                        <Option key={b.id} value={b.id}>
                          {b.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Yếu tố Rh</span>}
                    name="rh"
                    rules={[
                      { required: true, message: "Vui lòng chọn yếu tố Rh" },
                    ]}
                  >
                    <Select
                      className="rounded-select"
                      placeholder="Chọn Rh"
                      style={{ ...inputStyle, width: "100%" }}
                    >
                      <Option value="+">+</Option>
                      <Option value="-">-</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={<span style={labelStyle}>Tiền sử bệnh</span>}
                    name="tienSuBenh"
                  >
                    <Input.TextArea
                      placeholder="Không có"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                      style={{ ...inputStyle, borderRadius: 16, padding: 12 }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Cân nặng (kg)</span>}
                    name="canNang"
                    initialValue={50}
                    rules={[
                      { required: true, message: "Vui lòng chọn cân nặng" },
                    ]}
                  >
                    <Slider
                      min={30}
                      max={150}
                      step={0.5}
                      tooltip={{ open: currentStep === 2 }}
                      marks={{ 30: "30", 150: "150" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={<span style={labelStyle}>Chiều cao (cm)</span>}
                    name="chieuCao"
                    initialValue={160}
                    rules={[
                      { required: true, message: "Vui lòng chọn chiều cao" },
                    ]}
                  >
                    <Slider
                      min={100}
                      max={220}
                      step={0.5}
                      tooltip={{ open: currentStep === 2 }}
                      marks={{ 100: "100", 220: "220" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            {currentStep > 0 && (
              <Button
                onClick={prev}
                style={{
                  background: "#e53935",
                  borderColor: "#e53935",
                  color: "#fff",
                  borderRadius: 30,
                  fontWeight: 600,
                }}
              >
                Quay lại
              </Button>
            )}
            {currentStep < 2 ? (
              <Button
                type="primary"
                onClick={next}
                style={{
                  background: "#e53935",
                  borderColor: "#e53935",
                  borderRadius: 30,
                  fontWeight: 600,
                }}
              >
                Tiếp theo
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  height: 48,
                  borderRadius: 30,
                  background: "#e53935",
                  borderColor: "#e53935",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                ĐĂNG KÝ
              </Button>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            Đã có tài khoản?{" "}
            <a href="/login" style={{ color: "#1565c0" }}>
              Đăng nhập tại đây
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
}
