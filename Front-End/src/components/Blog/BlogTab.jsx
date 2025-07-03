import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tooltip,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogCategories } from "../../services/blogCategoryService";
import { createBlog, deleteBlog, getBlogs } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../variables/baseUrl";

export default function BlogTab() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialFormValues = {
    tieuDe: "",
    noidung: "",
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
    } catch (e) {
      message.error(e?.response?.data?.message || "Lỗi khi tải dữ liệu");
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
      formData.append("tieude", values.tieuDe);
      formData.append("noidung", values.noidung);
      formData.append("danhmuc", values.danhmuc);
      const file = values.anh?.[0]?.originFileObj;
      if (file) formData.append("anh", file);

      await createBlog(formData);
      message.success("Tạo blog thành công!");
      setOpen(false); // Modal destroyOnClose sẽ tự reset form
      fetchAll();
    } catch (e) {
      message.error(e?.response?.data?.message || "Tạo blog thất bại!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success("Xóa blog thành công!");
      fetchAll();
    } catch (error) {
      message.error(error?.response?.data?.message || "Xóa blog thất bại!");
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 60,
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieuDe",
      render: (text, record) => (
        <Button
          type="link"
          style={{ padding: 0, fontWeight: 600 }}
          onClick={() =>
            navigate(`/employee/blogs-manager/blog-detail/${record.id}`)
          }
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "danhMuc",
      render: (dm) =>
        dm?.tieuDe || <i style={{ color: "#b0b0b0" }}>Không có</i>,
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
            style={{
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(123,31,162,0.08)",
            }}
            preview={false}
          />
        ) : (
          "-"
        ),
      align: "center",
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              style={{ borderRadius: 8, background: "#fff" }}
              onClick={() =>
                navigate(`/employee/blogs-manager/blog-detail/${record.id}`)
              }
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
  ];

  return (
    <Card
      title="📝 Danh sách bài viết"
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 18px rgba(123,31,162,0.10)",
        overflow: "hidden",
      }}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          style={{
            borderRadius: 8,
            fontWeight: 600,
            background: "#7b1fa2",
            borderColor: "#7b1fa2",
          }}
        >
          Thêm blog
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        dataSource={blogs}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered={false}
        style={{ marginTop: 16 }}
        scroll={{ x: true }}
      />

      <Modal
        title="Thêm bài viết mới"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={800}
        okText="Thêm"
        cancelText="Huỷ"
        okButtonProps={{
          style: {
            borderRadius: 30,
            background: "#7b1fa2",
            borderColor: "#7b1fa2",
          },
        }}
        cancelButtonProps={{ style: { borderRadius: 30 } }}
        centered
        style={{ borderRadius: 18 }}
        bodyStyle={{ marginTop: 18 }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={initialFormValues} // reset tự động khi đóng mở modal
        >
          <Form.Item
            name="tieuDe"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input
              placeholder="Nhập tiêu đề blog"
              style={{
                borderRadius: 24,
                height: 40,
                paddingLeft: 14,
                backgroundColor: "#fefefe",
                border: "1px solid #e1bee7",
              }}
            />
          </Form.Item>

          <Form.Item
            name="noidung"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea
              rows={3}
              style={{
                borderRadius: 18,
                padding: 10,
                backgroundColor: "#fefefe",
                border: "1px solid #e1bee7",
              }}
              placeholder="Mô tả về  nội dung blog (nếu có)"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
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
              placeholder="Chọn danh mục"
              options={categories.map((c) => ({
                value: c.id,
                label: c.tieuDe,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
