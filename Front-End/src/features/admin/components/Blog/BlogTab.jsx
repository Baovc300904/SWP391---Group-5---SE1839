import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  message,
  Image,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getBlogCategories } from "../../services/blogCategoryService";
import { createBlog, deleteBlog, getBlogs } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../variables/baseUrl";
import MySlateEditor from "../MySlateEditor";

export default function BlogTab() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialFormValues = {
    tieuDe: "",
    noidung: JSON.stringify([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]),
    danhmuc: undefined,
    anh: [],
  };
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [blogRes, catRes] = await Promise.all([
        getBlogs(),
        getBlogCategories(),
      ]);
      setBlogs(blogRes?.content || []);
      setCategories(catRes || []);
    } catch {
      message.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("tieuDe", values.tieuDe);
      formData.append("noidung", values.noidung);
      formData.append("danhmuc", values.danhmuc);
      const file = values.anh?.[0]?.originFileObj;
      if (file) formData.append("anh", file);

      await createBlog(formData);
      message.success("Tạo blog thành công");
      setOpen(false);
      form.resetFields();
      setTimeout(() => form.setFieldsValue(initialFormValues), 0);
      fetchAll();
    } catch {
      message.error("Tạo blog thất bại");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success("Xóa blog thành công");
      fetchAll(); // cập nhật lại bảng
    } catch (error) {
      message.error(error?.response?.data?.message || "Xóa blog thất bại");
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialFormValues);
    }
  }, [open]);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm blog
      </Button>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={blogs}
        pagination={{ pageSize: 5 }}
        columns={[
          {
            title: "Tiêu đề",
            dataIndex: "tieuDe",
          },
          {
            title: "Danh mục",
            dataIndex: "danhMuc",
            render: (dm) => dm?.tieuDe || "-",
          },
          {
            title: "Ảnh",
            dataIndex: "anh",
            render: (url) =>
              url ? (
                <Image
                  src={`${IMAGE_BASE_URL}${url}`}
                  alt="Ảnh blog"
                  width={80}
                />
              ) : (
                "-"
              ),
          },
          {
            title: "Thao tác",
            key: "actions",
            render: (_, record) => (
              <div style={{ display: "flex", gap: 8 }}>
                <Tooltip title="Xem chi tiết">
                  <Button
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={() => navigate(`/blog/${record.id}`)}
                  />
                </Tooltip>
                <Popconfirm
                  title="Xác nhận xóa blog này?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Tooltip title="Xóa">
                    <Button icon={<DeleteOutlined />} size="small" danger />
                  </Tooltip>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      <Modal
        title="Thêm bài viết"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={800}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="tieuDe"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="noidung"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <MySlateEditor />
          </Form.Item>

          <Form.Item
            name="anh"
            label="Ảnh"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
          >
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="danhmuc"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select
              options={categories.map((c) => ({
                value: c.id,
                label: c.tieuDe,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
