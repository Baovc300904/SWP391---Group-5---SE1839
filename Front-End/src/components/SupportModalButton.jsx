import { CustomerServiceOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { createSupportTicket } from "../services/authService";

export default function SupportModalButton() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createSupportTicket(values);
      message.success("Gửi yêu cầu hỗ trợ thành công!");
      form.resetFields();
      setOpen(false);
    } catch (e) {
      message.error(
        e?.response?.data?.message || "Gửi yêu cầu hỗ trợ thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<CustomerServiceOutlined />}
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 36,
          bottom: 130,
          zIndex: 2001,
          boxShadow: "0 4px 12px rgba(244,67,54,0.24)",
          background: "#f44336",
          borderColor: "#f44336",
          width: 70,
          height: 70,
        }}
      />
      <Modal
        open={open}
        title="Gửi yêu cầu hỗ trợ"
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 8 }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Email liên hệ" />
          </Form.Item>
          <Form.Item
            name="sodienthoai"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="hoten"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item
            name="tieude"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input placeholder="Tiêu đề hỗ trợ" />
          </Form.Item>
          <Form.Item
            name="noidung"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input.TextArea rows={4} placeholder="Nội dung cần hỗ trợ..." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                background: "#f44336",
                borderColor: "#f44336",
                fontWeight: 600,
                borderRadius: 8,
                marginTop: 8,
              }}
            >
              Gửi hỗ trợ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
