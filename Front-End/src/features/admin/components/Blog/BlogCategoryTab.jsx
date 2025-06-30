import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  createBlogCategory,
  getBlogCategories,
} from "../../services/blogCategoryService";

export default function BlogCategoryTab() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBlogCategories();
      setData(res || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      await createBlogCategory(values);
      message.success("Tạo danh mục thành công");
      form.resetFields();
      setOpen(false);
      fetchData();
    } catch {
      message.error("Tạo danh mục thất bại");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm danh mục
      </Button>
      <Table
        rowKey="id"
        loading={loading}
        columns={[
          {
            title: "Tiêu đề",
            dataIndex: "tieuDe",
            render: (text, record) => (
              <Button
                type="link"
                onClick={() =>
                  navigate(`/blogs-manager/category-detail/${record.id}`)
                }
              >
                {text}
              </Button>
            ),
          },
          { title: "Nội dung", dataIndex: "noidung" },
        ]}
        dataSource={data}
      />

      <Modal
        title="Thêm danh mục blog"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="tieude" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="noidung" label="Nội dung">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
