// src/pages/BloodForm.jsx
import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

export default function BloodForm({ initialValues, onSubmit, onCancel }) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(initialValues || {});
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      preserve={false}
      style={{ marginTop: 12 }}
    >
      <Form.Item
        label="Name / Task"
        name="name"
        rules={[{ required: true, message: "Please enter name/task" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please enter status" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Admin" name="admin">
        <Input />
      </Form.Item>
      <Form.Item label="Progress (%)" name="progress">
        <InputNumber min={0} max={100} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" style={{ marginRight: 8 }}>
          {initialValues ? "Cập nhật" : "Tạo mới"}
        </Button>
        <Button onClick={onCancel}>Huỷ</Button>
      </Form.Item>
    </Form>
  );
}
