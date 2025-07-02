import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { useState } from "react";

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const columns = [
  { title: "#", dataIndex: "key" },
  { title: "Name", dataIndex: "name" },
  { title: "Blood Type", dataIndex: "bloodType" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Email", dataIndex: "email" },
];

export default function Donors() {
  const [data, setData] = useState([
    {
      key: 1,
      name: "Khoa",
      bloodType: "A+",
      phone: "0123456789",
      email: "Khoa@email.com",
    },
    {
      key: 2,
      name: "Hieu",
      bloodType: "O-",
      phone: "0234567891",
      email: "Hieu@email.com",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const addDonor = (values) => {
    setData([...data, { key: data.length + 1, ...values }]);
    setOpen(false);
    message.success("Added donor successfully!");
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setOpen(true)}
      >
        Add Donor
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Add Donor"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form form={form} layout="vertical" onFinish={addDonor}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="bloodType"
            label="Blood Type"
            rules={[{ required: true }]}
          >
            <Select options={bloodTypes.map((b) => ({ value: b, label: b }))} />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
